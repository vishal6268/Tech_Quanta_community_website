import React, { useState, useEffect, useMemo, useRef } from 'react';

const Volunteers = () => {
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
      setContainerSize({ width: window.innerWidth, height: window.innerHeight });
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
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const volunteers = [
    { id: 1, name: "Alice Johnson", role: "Frontend Developer" },
    { id: 2, name: "Bob Smith", role: "Backend Engineer" },
    { id: 3, name: "Carol Davis", role: "UI/UX Designer" },
    { id: 4, name: "David Wilson", role: "Product Manager" },
    { id: 5, name: "Eva Brown", role: "Data Scientist" },
    { id: 6, name: "Frank Miller", role: "DevOps Engineer" },
    { id: 7, name: "Grace Lee", role: "QA Engineer" },
    { id: 8, name: "Henry Taylor", role: "Marketing Lead" },
    { id: 9, name: "Iris Chen", role: "Content Writer" },
    { id: 10, name: "Jack Roberts", role: "Sales Manager" },
    { id: 11, name: "Karen White", role: "HR Specialist" },
    { id: 12, name: "Luke Anderson", role: "Finance Lead" },
    { id: 13, name: "Maya Patel", role: "Operations" },
    { id: 14, name: "Nick Thompson", role: "Tech Lead" },
    { id: 15, name: "Olivia Garcia", role: "Designer" },
    { id: 16, name: "Paul Martinez", role: "Developer" },
    { id: 17, name: "Quinn Rodriguez", role: "Analyst" },
    { id: 18, name: "Zoe Lin", role: "Support Engineer" },
  ];

  const getRandomGradient = (id) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff8a80 0%, #ea4c89 100%)',
      'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
      'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)',
      'linear-gradient(135deg, #e91e63 0%, #f06292 100%)',
      'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
      'linear-gradient(135deg, #3f51b5 0%, #7986cb 100%)',
      'linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)',
      'linear-gradient(135deg, #009688 0%, #4db6ac 100%)',
      'linear-gradient(135deg, #ff5722 0%, #ff8a65 100%)',
      'linear-gradient(135deg, #795548 0%, #a1887f 100%)',
    ];
    return gradients[id % gradients.length];
  };

  const getBubbleSize = (width) => {
    if (width <= 480) return 60;
    if (width <= 768) return 70;
    if (width <= 1024) return 80;
    if (width <= 1400) return 90;
    return 100;
  };

  const bubbleSize = useMemo(() => getBubbleSize(containerSize.width), [containerSize.width]);

  const adjustedPattern = useMemo(() => {
    const pattern = [];
    let total = 0;
    let rowIndex = 0;
    while (total < volunteers.length) {
      const rowSize = containerSize.width <= 600 ? 2 : rowIndex % 2 === 0 ? 4 : 3;
      const remaining = volunteers.length - total;
      pattern.push(Math.min(rowSize, remaining));
      total += Math.min(rowSize, remaining);
      rowIndex++;
    }
    return pattern;
  }, [volunteers.length, containerSize.width]);

  const verticalSpacing = bubbleSize * 2;
  const totalHeight = (adjustedPattern.length - 1) * verticalSpacing + bubbleSize;
  const requiredHeight = totalHeight + bubbleSize * 2 + 100;

  const positions = useMemo(() => {
    const horizontalSpacing = Math.min(180, containerSize.width * 0.18);
    const firstRowY = 160;
    const positions = [];
    let index = 0;

    for (let row = 0; row < adjustedPattern.length; row++) {
      const count = adjustedPattern[row];
      const rowWidth = (count - 1) * horizontalSpacing;
      const leftMargin = (containerSize.width - rowWidth) / 2;
      const y = firstRowY + row * verticalSpacing;

      for (let col = 0; col < count && index < volunteers.length; col++) {
        const x = leftMargin + col * horizontalSpacing - bubbleSize / 2;
        positions.push({ x, y });
        index++;
      }
    }
    return positions;
  }, [containerSize.width, bubbleSize, adjustedPattern]);

  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      height: `${requiredHeight}px`,
      backgroundColor: 'transparent',
      overflow: 'hidden',
      padding: '40px 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontFamily: 'system-ui, sans-serif',
    },
    headingContainer: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    heading: {
      color: theme == 'light' ? "black":"white",
      fontSize: '42px',
      fontWeight: 'bold',
      marginBottom: '12px',
    },
    separator: {
      width: '90px',
      height: '2px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      border: 'none',
      margin: '0 auto',
    },
    volunteerItem: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 1.8s ease',
      cursor: 'pointer',
    },
    volunteerAvatar: {
      width: `${bubbleSize}px`,
      height: `${bubbleSize}px`,
      borderRadius: '50%',
      overflow: 'hidden',
      marginBottom: '10px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
      border: '2px solid rgba(255,255,255,0.2)',
      position: 'relative',
    },
    avatarShine: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)',
      borderRadius: '50%',
    },
    volunteerName: {
      color: 'white',
      fontSize: '15px',
      fontWeight: 600,
      maxWidth: '130px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textShadow: '0 1px 4px rgba(0,0,0,0.6)',
    },
    volunteerRole: {
      color: '#ccc',
      fontSize: '13px',
      maxWidth: '130px',
      textShadow: '0 1px 4px rgba(0,0,0,0.5)',
    }
  };

  return (
    <div style={styles.container} ref={containerRef}>
      <div style={styles.headingContainer}>
        <h2 style={styles.heading} className="font-mono ">Our Volunteers</h2>
        <hr style={styles.separator} />
      </div>

      {isLoaded &&
        volunteers.map((volunteer, index) => {
          const pos = positions[index];
          return (
            <div key={volunteer.id} style={{ ...styles.volunteerItem, left: pos.x, top: pos.y }}>
              <div style={{ ...styles.volunteerAvatar, background: getRandomGradient(index) }}>
                <div style={styles.avatarShine} />
              </div>
              <div style={styles.volunteerName}>{volunteer.name}</div>
              <div style={styles.volunteerRole}>{volunteer.role}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Volunteers;
