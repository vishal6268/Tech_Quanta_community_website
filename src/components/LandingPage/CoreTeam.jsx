import React, { useState, useEffect, useMemo, useRef } from 'react';

const CoreTeam = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const containerRef = useRef(null);
  const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');

  mediaQuery.addEventListener('change', handleThemeChange);
  return () => mediaQuery.removeEventListener('change', handleThemeChange);
}, []);


  useEffect(() => {
    const updateSize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const volunteers = [
    { id: 1, name: "", role: "Frontend Developer",image:"memoji.webp" },
    { id: 2, name: "Karan Kose", role: "MERN/React Native Developer",image:"/profiles/karankose.webp"  },
    { id: 3, name: "Vishal Chourdhary", role: "Java Developer",image:"/profiles/choudharyvishal.png"  },
    { id: 4, name: "Agrim Jain", role: "Data Scientist",image:"/profiles/jainagrim.webp"  },
    { id: 5, name: "Arsh Choudhary", role: "Full Stack Engineer",image:"/profiles/choudharyarsh.webp"  },
    { id: 6, name: "Jayesh Tapadiya", role: "Full Stack Developer",image:"/profiles/tapadiyajayesh.webp"  },
    { id: 7, name: "Himanshu Sahu", role: "Data Scientist",image:"/profiles/sahuhimanshu.webp"  },
    { id: 8, name: "Ashmeet Singh", role: "Data Engineer",image:"/profiles/singashmeet.webp" },
    { id: 9, name: "Balram Dhakad", role: "Full Stack Developer",image:"/profiles/dhakadbalram.webp"  },
    { id: 10, name: "Yashpreet Singh", role: "Management Head",image:"memoji.webp"  },
    { id: 11, name: "Karen White", role: "HR Specialist",image:"memoji.webp"  },
    { id: 12, name: "Luke Anderson", role: "Finance Lead",image:"memoji.webp"  },
    { id: 13, name: "Maya Patel", role: "Operations",image:"memoji.webp"  },
    { id: 14, name: "Nick Thompson", role: "Tech Lead",image:"memoji.webp" },
    { id: 15, name: "Olivia Garcia", role: "Designer",image:"memoji.webp"  },
  ];

  const getBubbleSize = (width) => {
    if (width <= 480) return 60;
    if (width <= 768) return 70;
    if (width <= 1024) return 90;
    if (width <= 1400) return 100;
    return 120;
  };

  const bubbleSize = useMemo(() => getBubbleSize(containerSize.width), [containerSize.width]);

  const adjustedPattern = useMemo(() => {
    const pattern = [3,2, 5 ,2,3];
    let adjusted = [];
    let total = 0;
    for (let i = 0; i < pattern.length && total < volunteers.length; i++) {
      const remaining = volunteers.length - total;
      const current = Math.min(pattern[i], remaining);
      adjusted.push(current);
      total += current;
    }
    return adjusted;
  }, [volunteers.length]);

  const verticalSpacing = bubbleSize * 2.3;
  const rows = adjustedPattern.length;
  const totalHeight = (rows - 1) * verticalSpacing + 70;
  const requiredHeight = totalHeight + bubbleSize * 2 + 100;

  const positions = useMemo(() => {
    const horizontalSpacing = Math.min(160, containerSize.width * 0.12);
    const startY = (requiredHeight - totalHeight) / 2 + 80;

    const positions = [];
    let volunteerIndex = 0;

    adjustedPattern.forEach((rowCount, rowIndex) => {
      const rowWidth = (rowCount - 1) * horizontalSpacing;
      const startX = (containerSize.width - rowWidth) / 2;

      let direction;
      if (rowIndex === 0) {
        direction = 'from-top';
      } else if (rowIndex === adjustedPattern.length - 1) {
        direction = 'from-bottom';
      } else if (rowIndex < adjustedPattern.length / 2) {
        direction = rowIndex % 2 === 1 ? 'from-left' : 'from-right';
      } else {
        direction = rowIndex % 2 === 1 ? 'from-right' : 'from-left';
      }

      for (let colIndex = 0; colIndex < rowCount && volunteerIndex < volunteers.length; colIndex++) {
        const x = startX + colIndex * horizontalSpacing - 46;
        const y = startY + rowIndex * verticalSpacing - 60;
        const randomX = x + (Math.random() - 0.5) * 10;
        const randomY = y + (Math.random() - 0.5) * 15;
        positions.push({
          x: Math.max(bubbleSize / 2, Math.min(randomX, containerSize.width - bubbleSize / 2)),
          y: Math.max(bubbleSize / 2, Math.min(randomY, requiredHeight - bubbleSize / 2)),
          direction,
          row: rowIndex,
          col: colIndex,
        });
        volunteerIndex++;
      }
    });
    return positions;
  }, [containerSize.width, requiredHeight, bubbleSize, adjustedPattern]);

  const styles = {
    container: {
      position: 'relative',
      width: '100vw',
      height: `${requiredHeight}px`,
      backgroundColor: 'transparent',
      borderRadius:'25px',
      color: 'white',
      overflow: 'hidden',
    },
    headingContainer: {
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      zIndex: 20,
    },
    heading: {
      color: theme === 'dark' ? 'white' : 'black',
      fontFamily: 'rajdhani',
      fontSize: '64px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    separator: {
      border: 'none',
      height: '2px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      width: '100px',
      margin: '0 auto',
    },
    volunteerItem: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      zIndex: 10,
      transition: 'all 2s cubic-bezier(0.33, 0, 0, 1)', // Smoother and longer transition
      cursor: 'pointer',
      userSelect: 'none',
    },
    volunteerAvatar: {
      width: `${bubbleSize}px`,
      height: `${bubbleSize}px`,
      borderRadius: '30%',
      marginBottom: '10px',
      position: 'relative',
      overflow: 'hidden',
      // boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
    },
    
    volunteerName: {
      color: theme === 'light' ? 'black' : 'white',
      fontSize: '16px',
      fontWeight: '700',
      marginBottom: '6px',
      maxWidth: '140px',
      lineHeight: '1.3',
      textShadow: '0 2px 8px rgba(0,0,0,0.7)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    volunteerRole: {
      color: theme === 'dark' ? 'white' : 'black',
      fontSize: '14px',
      marginBottom: '8px',
      maxWidth: '140px',
      lineHeight: '1.2',
      textShadow: '0 1px 4px rgba(0,0,0,0.7)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    linkedinIcon: {
      width: '1rem',
      height: 'auto',
      backgroundColor: "#00BFFF",
      borderRadius: '4px',
      position: 'relative',
      display: 'flex',
      alignItems: 'right',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0,119,181,0.4)',
    },
  };

  const getAnimationStyle = (direction, rowIndex, position) => {
    let initial = {};
    switch (direction) {
      case 'from-left':
        initial = { transform: `translate(${-containerSize.width}px, 0)`, opacity: 0 };
        break;
      case 'from-right':
        initial = { transform: `translate(${containerSize.width}px, 0)`, opacity: 0 };
        break;
      case 'from-top':
        initial = { transform: `translate(0, ${-requiredHeight}px)`, opacity: 0 };
        break;
      case 'from-bottom':
        initial = { transform: `translate(0, ${requiredHeight}px)`, opacity: 0 };
        break;
      default:
        initial = { opacity: 0 };
    }
    return {
      ...styles.volunteerItem,
      left: position.x - bubbleSize / 2,
      top: position.y - bubbleSize / 2,
      ...(isLoaded ? { transform: 'translate(0, 0)', opacity: 1 } : initial),
      transitionDelay: `${rowIndex * 500}ms`, // Increased delay for row-based staggering
    };
  };

  return (
    <div ref={containerRef} style={styles.container} className='flex justify-center items-center w-full bg-transparent'>
      <div style={styles.headingContainer}>
        <h1 style={styles.heading}>Community Core Team</h1>
        <hr style={styles.separator} />
      </div>
      {volunteers.map((volunteer, index) => (
        <div
          key={volunteer.id}
          className="volunteer-item"
          style={getAnimationStyle(
            positions[index]?.direction || 'from-top',
            positions[index]?.row || 0,
            positions[index] || { x: containerSize.width / 2, y: requiredHeight / 2 }
          )}
        >
          <div
            style={{
              ...styles.volunteerAvatar,
              backgroundImage: `url(${volunteer.image}) `,
            }}
            className="volunteer-avatar "
          >
            <div style={styles.avatarShine}></div>
          </div>
          <div style={styles.volunteerName} className="volunteer-name font-space-grotesk">
            <div style={styles.linkedinIcon} className="linkedin-icon">
            in
          </div>
            {volunteer.name}
          </div>
          <div style={styles.volunteerRole} className="volunteer-role font-mono ">
            {volunteer.role}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoreTeam;