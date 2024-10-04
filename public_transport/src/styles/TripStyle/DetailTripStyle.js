const DetailTripStyle = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      containerRgba: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      heading: {
        marginBottom: '20px',
        fontWeight: 'bold',
        color: '#333',
      },
      mainContent: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap'
      },
      seatList: {
        // width: '40%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '10px',
      },
      column: {
        display: 'flex',
        justifyContent: 'center',
      },
      infoSection: {
        width: '60%',
        padding: '20px',
        borderLeft: '1px solid #ddd',
      },
      seatButton: {
        minWidth: '60px',
        maxWidth: '65px',
        minHeight: '30px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        borderRadius: '8px',
        transition: 'background-color 0.3s, transform 0.2s',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
      },
      bookButton: {
        padding: '8px 20px',
        fontSize: '18px',
        fontWeight: '600',
        marginTop: '10px'
      },
      bookButton2: {
        padding: '8px 20px',
        fontSize: '18px',
        fontWeight: '600',
      },
      bookButton3: {
        padding: '6px 10px',
        fontSize: '15px',
      },
      flex:{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        marginTop: '2.5rem'
      },
      flex2:{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        marginTop: '1rem',
        marginBottom: '2rem'
      }
}
export default DetailTripStyle