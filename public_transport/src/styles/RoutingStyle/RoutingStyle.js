


const RoutingStyle = {
    container: {
        padding: '10px',
        margin: '20px',
    },
    container2: {
        padding: '10px',
        margin: '20px 10%',
        '@media (max-width: 768px)': {
      minWidth: '100%',
    },
    },
    containerWithOutMg: {
        padding: '10px',
        margin: '20px 20px 0 20px',
    },
    pageContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center'
    },
    cardContainer:{
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', margin: '20px 10px 0px 10px'
    },
    divListRouting:{width: '80%', display:'flex', justifyContent: 'flex-end'},
    divListRouting2:{width: '100%', display:'flex', justifyContent: 'flex-end'},
    listRouting:{ width: '100%', maxWidth: 360,bgcolor: 'background.paper'},
  };
  
  export default RoutingStyle;
  