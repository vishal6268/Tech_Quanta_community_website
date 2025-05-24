import React, { useState, useEffect } from 'react';

const CoreTeam = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateSize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('resize', updateSize);
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
    { id: 17, name: "Quinn Rodriguez", role: "Analyst" }
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
      'linear-gradient(135deg, #795548 0%, #a1887f 100%)'
    ];
    return gradients[id % gradients.length];
  };

  const getBubbleSize = () => {
    const width = window.innerWidth;
    if (width <= 480) return 60;
    if (width <= 768) return 70;
    if (width <= 1024) return 90;
    if (width <= 1400) return 100;
    return 120;
  };

  const calculateDiamondPositions = () => {
    const bubbleSize = getBubbleSize();
    const horizontalSpacing = Math.min(160, containerSize.width * 0.12);
    const verticalSpacing = bubbleSize + 40;

    const pattern = [3, 5, 7, 5, 3];
    let adjustedPattern = [];
    let totalAssigned = 0;

    for (let i = 0; i < pattern.length && totalAssigned < volunteers.length; i++) {
      const remaining = volunteers.length - totalAssigned;
      const currentRowSize = Math.min(pattern[i], remaining);
      adjustedPattern.push(currentRowSize);
      totalAssigned += currentRowSize;
    }

    const totalHeight = (adjustedPattern.length - 1) * verticalSpacing;
    const startY = (containerSize.height - totalHeight) / 2;

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
        const x = startX + (colIndex * horizontalSpacing);
        const y = startY + (rowIndex * verticalSpacing);

        const randomX = x + (Math.random() - 0.5) * 20;
        const randomY = y + (Math.random() - 0.5) * 15;

        positions.push({
          x: Math.max(bubbleSize / 2, Math.min(randomX, containerSize.width - bubbleSize / 2)),
          y: Math.max(bubbleSize / 2, Math.min(randomY, containerSize.height - bubbleSize / 2)),
          direction,
          row: rowIndex,
          col: colIndex
        });

        volunteerIndex++;
      }
    });

    return positions;
  };

  const positions = calculateDiamondPositions();

  const styles = {
    container: {
      position: 'relative',
      width: '100vw',
      height: '50rem',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    volunteerItem: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      zIndex: 10,
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      userSelect: 'none'
    },
    volunteerAvatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      marginBottom: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      border: '3px solid rgba(255,255,255,0.15)'
    },
    avatarShine: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 60%)',
      borderRadius: '50%'
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
      textOverflow: 'ellipsis'
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
      textOverflow: 'ellipsis'
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
      boxShadow: '0 4px 12px rgba(0,119,181,0.4)'
    }
  };

  const getAnimationStyle = (direction, delay, position) => {
    let initial = {};
    
    switch (direction) {
      case 'from-left':
        initial = { transform: `translate(${-containerSize.width}px, 0)`, opacity: 0 };
        break;
      case 'from-right':
        initial = { transform: `translate(${containerSize.width}px, 0)`, opacity: 0 };
        break;
      case 'from-top':
        initial = { transform: `translate(0, ${-containerSize.height}px)`, opacity: 0 };
        break;
      case 'from-bottom':
        initial = { transform: `translate(0, ${containerSize.height}px)`, opacity: 0 };
        break;
      default:
        initial = { opacity: 0 };
    }

    const bubbleSize = getBubbleSize();
    return {
      ...styles.volunteerItem,
      left: position.x - bubbleSize / 2,
      top: position.y - bubbleSize / 2,
      ...(isLoaded ? { 
        transform: 'translate(0, 0)', 
        opacity: 1 
      } : initial),
      transitionDelay: `${delay * 200}ms`
    };
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes diamondFloat {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1); 
            }
            25% { 
              transform: translateY(-15px) rotate(1deg) scale(1.02); 
            }
            50% { 
              transform: translateY(-8px) rotate(-1deg) scale(0.98); 
            }
            75% { 
              transform: translateY(-20px) rotate(0.5deg) scale(1.01); 
            }
          }
          
          @keyframes pulse {
            0%, 100% { 
              box-shadow: 0 10px 40px rgba(0,0,0,0.4); 
            }
            50% { 
              box-shadow: 0 15px 60px rgba(0,0,0,0.6); 
            }
          }
          
          .volunteer-item {
            animation: diamondFloat 10s ease-in-out infinite;
          }
          
          .volunteer-item:nth-child(3n) {
            animation-delay: 1s;
          }
          
          .volunteer-item:nth-child(3n+1) {
            animation-delay: 2s;
          }
          
          .volunteer-item:nth-child(3n+2) {
            animation-delay: 3s;
          }
          
          .volunteer-item .volunteer-avatar {
            animation: pulse 6s ease-in-out infinite;
          }
          
          .volunteer-item:hover {
            transform: scale(1.2) !important;
            z-index: 100 !important;
            filter: brightness(1.15) saturate(1.2);
          }
          
          .volunteer-item:hover .volunteer-avatar {
            transform: rotate(5deg);
            box-shadow: 0 20px 80px rgba(0,0,0,0.8) !important;
          }
          
          .volunteer-item:hover .volunteer-name {
            color: #fff !important;
            font-size: 18px !important;
            font-weight: 700 !important;
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
            positions[index]?.direction || 'from-top', 
            index + 1, 
            positions[index] || { x: containerSize.width/2, y: containerSize.height/2 }
          )}
        >
          <div
            style={{
              ...styles.volunteerAvatar,
              background: getRandomGradient(volunteer.id)
            }}
          >
            <div style={styles.avatarShine}></div>
          </div>
          <div style={styles.volunteerName}>{volunteer.name}</div>
          <div style={styles.volunteerRole}>{volunteer.role}</div>
          <div style={styles.linkedinIcon}>in</div>
        </div>
      ))}
    </div>
  );
};

export default CoreTeam;