const ChatbotStyles = {
    chatContainer: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      zIndex: 1000,
    },
    chatBox: {
      width: '400px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      position: 'relative',
    },
    header: {
      backgroundColor: '#4CAF50',
      color: '#fff',
      padding: '10px',
      textAlign: 'center',
      fontSize: '18px',
      position: 'relative',
    },
    title: {
      textAlign: 'center',       
      width: '100%',            
      fontSize: '18px',
    },
    closeButton: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      position: 'absolute',     
      top: '10px',               
      right: '10px',            
    },
    chatContent: {
      padding: '15px',
      minHeight: '150px',
      borderBottom: '1px solid #ddd',
    },
    inputContainer: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #ddd',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginRight: '10px',
    },
    sendButton: {
      padding: '10px 15px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      fontWeight: 'bold',
    },
    openButton: {
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      padding: '10px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };
  
  export default ChatbotStyles;
  