

// HomeStyles.js
const homeStyles = {
    main: {
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1200px',
      backgroundColor: 'lightskyblue',
      borderRadius: '20px',
      overflow: 'hidden',
      backgroundImage: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/decor-1.svg)'
    },
    containerStatic: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1200px',
      backgroundColor: 'lightseagreen',
      borderRadius: '20px',
      overflow: 'hidden',
      backgroundImage: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/download-bg.png)'
    },
    containerBodyHome: {
      
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1200px',
      backgroundColor: '#F7F5F3',
      borderRadius: '20px',
      overflow: 'hidden',
      backgroundPosition: '.87805rem 2.53659rem',
      backgroundImage: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/download-bg-mb.png)'
    },
    footer:{
      backgroundColor: "#1976d2",
      padding: "3px",
      textAlign: "center",
      bottom: 0,
      width: "100%",
    },
    containerMoment: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1200px',
      backgroundColor: 'rgb(96, 231, 96)',
      borderRadius: '20px',
      overflow: 'hidden',
      backgroundPosition: '.87805rem 2.53659rem',
      backgroundImage: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/bg-1-mb.svg)'
    },
    //
    contentRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    textContent: {
      margin: '40px',
      backgroundColor: 'white',
      padding: '40px',
      flex: 1,
      minWidth: '300px',
      boxSizing: 'border-box',
      borderRadius: '15px',
      position: 'relative',
    },
    textContentStatic: {
      margin: '40px',
      backgroundColor: 'lightseagreen',
      padding: '40px',
      flex: 1,
      minWidth: '300px',
      boxSizing: 'border-box',
      borderRadius: '15px',
      position: 'relative',
    },
    heading1Moment: {
      letterSpacing: '5px',
      color: 'rgb(25, 118, 210)',
      fontSize: '2rem',
      marginBottom: '20px',
    },

    heading1: {
      letterSpacing: '5px',
      color: 'rgb(25, 118, 210)',
      fontSize: '2rem',
      marginBottom: '20px',
    },
    heading2: {
      letterSpacing: '3px',
      color: 'rgb(25, 118, 210)',
      fontSize: '2.5rem',
      marginBottom: '20px',
    },
    heading1BodyHome: {
      letterSpacing: '5px',
      color: '#60e760',
      fontSize: '2rem',
      marginBottom: '20px',
    },
    heading2BodyHome: {
      letterSpacing: '3px',
      color: '#60e760',
      fontSize: '2.5rem',
      marginBottom: '20px',
    },
    heading2BodyHomeMoment: {
      textAlign: 'center',
      letterSpacing: '3px',
      color: '#60e760',
      fontSize: '2.5rem',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '1.1rem',
      marginBottom: '20px',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    buttonPrimary: {
      backgroundColor: '#00b14f',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      textDecoration: 'none',
      marginRight: '20px',
      marginBottom: '10px',
    },
    buttonSecondary: {
      color: '#007343',
      textDecoration: 'none',
      marginBottom: '10px',
    },
    goodWorksImage: {
      position: 'absolute',
      bottom: '-60px',
      left: '10%',
      transform: 'translateX(8%) rotate(2deg)',
      zIndex: 2,
      width: '300px',
    },
    wowWorksImage: {
      padding: '10px',
      position: 'absolute',
      bottom: '-29px',
      left: '60%',
      transform: 'translateX(10%) rotate(-2deg)',
      zIndex: 2
    },
    wowImageStat: {
      position: 'absolute',
      bottom: '-21px',
      left: '44%',
      padding: '14px',
      transform: 'translateX(13%) rotate(5deg)',
      zIndex: 1000
    },
    wonderfulImage: {
      position: 'absolute',
      top: '-3  px',
      left: '19%',
      transform: 'translateX(8%) rotate(2deg)',
      zIndex: 2,
      width: '300px',
    },
    imageContent: {
      padding: '40px',
      flex: 1,
      minWidth: '300px',
      position: 'relative',
      boxSizing: 'border-box',
      paddingLeft: '40px',
    },
    busImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '20px',
    },
    spinnerStyle:{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imgMoment:{
      // width: '200px',
      marginRight: '5px',
      // height: '200px',
      // borderRadius: '10px',
      // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 10px',
      // overflow: 'hidden'
      // marginRight: '5px',
      borderRadius: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 10px',
      width: '200px',
      height: '200px',
      transition: 'opacity 0.5s ease-out',
    },
    divImgMoment:{
      display: 'flex', justifyContent: 'center', alignItems: 'center',padding: '10px',
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      maxWidth: '600px',
      margin: 'auto',
    },
    blueImgBackground:{
      backgroundImage:
        "url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/decor-1.svg)",
    },
    btnProfile:{width:'100%', backgroundColor:'white', border:'0px', borderBottom:'1px solid rgb(25, 118, 210)'},
    mgdiv:{margin:'1rem 0 9rem 0'},
    detailHeading:{
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      fontSize: "2em",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "rgb(7, 171, 110)",
      padding: "15px",
      textTransform: "uppercase",
      borderRadius: '10px'
    },
    userHi:{
      marginTop: '8px',
      padding: '0 1rem',
      color: 'white',
      display: 'flex',

    },
    box:{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: 'auto' }
  };
  
  export default homeStyles;
  