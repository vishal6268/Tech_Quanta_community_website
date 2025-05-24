import React, { useState, useEffect, useMemo, useRef } from 'react';

const Volunteers = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const containerRef = useRef(null);

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
    if (width <= 1024) return 90;
    if (width <= 1400) return 100;
    return 120;
  };

  const bubbleSize = useMemo(() => getBubbleSize(containerSize.width), [containerSize.width]);

  const adjustedPattern = useMemo(() => {
    const pattern = [];
    let total = 0;
    let rowIndex = 0;
    while (total < volunteers.length) {
      const rowSize = rowIndex % 2 === 0 ? 4 : 3;
      const remaining = volunteers.length - total;
      const currentRowSize = Math.min(rowSize, remaining);
      pattern.push(currentRowSize);
      total += currentRowSize;
      rowIndex++;
    }
    return pattern;
  }, [volunteers.length]);

  const verticalSpacing = bubbleSize * 2.0;
  const rows = adjustedPattern.length;
  const totalHeight = (rows - 1) * verticalSpacing + bubbleSize;
  const requiredHeight = totalHeight + bubbleSize * 2 + 100;

  const positions = useMemo(() => {
    const horizontalSpacing = Math.min(160, containerSize.width * 0.12);
    const firstRowY = 150; // Starting position below heading
    const positions = [];
    let volunteerIndex = 0;

    for (let rowIndex = 0; rowIndex < adjustedPattern.length; rowIndex++) {
      const rowCount = adjustedPattern[rowIndex];
      const rowWidth = (rowCount - 1) * horizontalSpacing;
      const leftMargin = (containerSize.width - rowWidth) / 2;
      const y = firstRowY + rowIndex * verticalSpacing + 30;

      for (let colIndex = 0; colIndex < rowCount && volunteerIndex < volunteers.length; colIndex++) {
        const x = leftMargin + colIndex * horizontalSpacing - 42;
        positions.push({
          x,
          y,
          direction: 'from-right',
          row: rowIndex,
          col: colIndex,
        });
        volunteerIndex++;
      }
    }
    return positions;
  }, [containerSize.width, bubbleSize, adjustedPattern]);

  const styles = {
    container: {
      position: 'relative',
      width: '100vw',
           borderRadius:'25px',
      height: `${requiredHeight}px`,
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
      color: 'white',
      fontSize: '34px',
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
      transition: 'all 2s cubic-bezier(0.33, 0, 0, 1)',
      cursor: 'pointer',
      userSelect: 'none',
    },
    volunteerAvatar: {
      width: `${bubbleSize}px`,
      height: `${bubbleSize}px`,
      borderRadius: '50%',
      marginBottom: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      border: '3px solid rgba(255,255,255,0.15)',
    },
    avatarShine: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 60%)',
      borderRadius: '50%',
    },
    volunteerName: {
      color: 'white',
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '6px',
      maxWidth: '140px',
      lineHeight: '1.3',
      textShadow: '0 2px 8px rgba(0,0,0,0.7)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    volunteerRole: {
      color: '#bbb',
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
      width: '22px',
      height: '22px',
      backgroundColor: '#0077b5',
      borderRadius: '4px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0,119,181,0.4)',
    },
  };

  const getAnimationStyle = (direction, rowIndex, position) => {
    let initial = {};
    if (direction === 'from-right') {
      initial = { transform: `translate(${containerSize.width}px, 0)`, opacity: 0 };
    }
    return {
      ...styles.volunteerItem,
      left: position.x - bubbleSize / 2,
      top: position.y - bubbleSize / 2,
      ...(isLoaded ? { transform: 'translate(0, 0)', opacity: 1 } : initial),
      transitionDelay: `${rowIndex * 500}ms`,
    };
  };

  return (
    <div ref={containerRef} style={styles.container} className='flex justify-center items-center w-full'>
      <div style={styles.headingContainer}>
        <h1 style={styles.heading}>Community Volunteer</h1>
        <hr style={styles.separator} />
      </div>
      <style>
        {`
          @keyframes diamondFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .volunteer-item {
            animation: diamondFloat 10s ease-in-out infinite;
            transition: opacity 2s cubic-bezier(0.33, 0, 0, 1), transform 2s cubic-bezier(0.33, 0, 0, 1), filter 0.3s ease;
          }
          .volunteer-avatar {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .volunteer-item:hover {
            z-index: 100 !important;
            filter: brightness(1.1) saturate(1.1);
            transition: transform 0.3s ease;
          }
          .volunteer-item:hover .volunteer-avatar {
            transform: scale(1.1) !important;
            transform: rotate(5deg);
            box-shadow: 0 20px 80px rgba(0,0,0,0.8) !important;
          }
          .volunteer-item:hover .volunteer-name {
            color: #fff !important;
            font-size: 17px !important;
            font-weight: 600 !important;
          }
          .volunteer-item:hover .volunteer-role {
            color: #eee !important;
            font-size: 15px !important;
          }
          @media (max-width: 1400px) {
            .volunteer-avatar {
              width: 100px !important;
              height: 100px !important;
            }
            .volunteer-name {
              font-size: 14px !important;
            }
            .volunteer-role {
              font-size: 12px !important;
            }
          }
          @media (max-width: 1024px) {
            .volunteer-avatar {
              width: 90px !important;
              height: 90px !important;
            }
            .volunteer-name {
              font-size: 13px !important;
              max-width: 110px !important;
            }
            .volunteer-role {
              font-size: 11px !important;
              max-width: 110px !important;
            }
          }
          @media (max-width: 768px) {
            .volunteer-avatar {
              width: 70px !important;
              height: 70px !important;
            }
            .volunteer-name {
              font-size: 12px !important;
              max-width: 90px !important;
            }
            .volunteer-role {
              font-size: 10px !important;
              max-width: 90px !important;
            }
            .linkedin-icon {
              width: 16px !important;
              height: 16px !important;
              font-size: 10px !important;
            }
          }
          @media (max-width: 480px) {
            .volunteer-avatar {
              width: 60px !important;
              height: 60px !important;
            }
            .volunteer-name {
              font-size: 10px !important;
              max-width: 70px !important;
            }
            .volunteer-role {
              font-size: 9px !important;
              max-width: 70px !important;
            }
            .linkedin-icon {
              width: 14px !important;
              height: 14px !important;
              font-size: 8px !important;
            }
          }
        `}
      </style>
      {volunteers.map((volunteer, index) => (
        <div
          key={volunteer.id}
          className="volunteer-item"
          style={getAnimationStyle(
            positions[index]?.direction || 'from-right',
            positions[index]?.row || 0,
            positions[index] || { x: containerSize.width / 2, y: requiredHeight / 2 }
          )}
        >
          <div
            style={{
              ...styles.volunteerAvatar,
              background: getRandomGradient(volunteer.id),
            }}
            className="volunteer-avatar"
          >
            <div style={styles.avatarShine}></div>
          </div>
          <div style={styles.volunteerName} className="volunteer-name">
            {volunteer.name}
          </div>
          <div style={styles.volunteerRole} className="volunteer-role">
            {volunteer.role}
          </div>
          <div style={styles.linkedinIcon} className="linkedin-icon">
            in
          </div>
        </div>
      ))}
    </div>
  );
};

export default Volunteers;