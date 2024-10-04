
  
const busMapStyles = {
    layoutContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '20px',
    },
    imageItem: {
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    largeImageItem: {
      flexBasis: 'calc(30% - 10px)',
    },
    mediumImageItem: {
      display: 'flex',
      justifyContent: 'center',
      flexBasis: 'calc(30% - 20px)',
    },
    mediumImageItemMoment: {
        maxHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'calc(30% - 20px)',
      },
    smallImageItem: {
      flexBasis: 'calc(25% - 20px)',
    },
    image: {
      width: '100%',
      height: 'auto',
      display: 'block',
      minHeight: '340px',
    },
    textItem1: {
        minHeight: '340px',
        backgroundImage: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/decor-2.svg)',
      flexBasis: 'calc(25% - 20px)',
      backgroundColor: '#f0ab4a',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    textItem2: {
        backgroundImage: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/decor-1.svg)',
      flexBasis: 'calc(25% - 20px)',
      backgroundColor: '#7ad1ed',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    colorWhitesmoke:{
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        letterSpacing: '1px'
    },
    textItem3: {
        
        backgroundImage: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/decor-3.svg)',
      flexBasis: 'calc(25% - 20px)',
      backgroundColor: '#07ab6e',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    textParagraph: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#333',
      margin: 0,
    },
  
    // Responsive Styles
    '@media (max-width: 1200px)': {
      largeImageItem: {
        flexBasis: 'calc(50% - 20px)',
      },
      mediumImageItem: {
        flexBasis: 'calc(45% - 20px)',
      },
      smallImageItem: {
        flexBasis: 'calc(40% - 20px)',
      },
    },
    '@media (max-width: 992px)': {
      largeImageItem: {
        flexBasis: 'calc(60% - 20px)',
      },
      mediumImageItem: {
        flexBasis: 'calc(60% - 20px)',
      },
      smallImageItem: {
        flexBasis: 'calc(50% - 20px)',
      },
    },
    '@media (max-width: 768px)': {
      largeImageItem: {
        flexBasis: 'calc(80% - 20px)',
      },
      mediumImageItem: {
        flexBasis: 'calc(80% - 20px)',
      },
      smallImageItem: {
        flexBasis: 'calc(70% - 20px)',
      },
      textItem: {
        flexBasis: 'calc(100% - 20px)',
      },
    },
    '@media (max-width: 576px)': {
      largeImageItem: {
        flexBasis: 'calc(100% - 20px)',
      },
      mediumImageItem: {
        flexBasis: 'calc(100% - 20px)',
      },
      smallImageItem: {
        flexBasis: 'calc(100% - 20px)',
      },
      textItem: {
        flexBasis: 'calc(100% - 20px)',
      },
    },
  };
  
  export default busMapStyles;
  