import React, { useState } from 'react';
import Apis, { endpoints } from '../../config/Apis';
import ChatbotStyles from '../../styles/Mutual/Chatbot';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('')
  const [botResponse, setBotResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await Apis.post(endpoints['assistant'], { message: userMessage });

      if (response.data && response.data.message) {
        const botMessage = response.data.message[0]?.content?.parts[0]?.text || "Không có phản hồi từ bot";
        setBotResponse(botMessage);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi gửi tin nhắn.');
    } finally {
      setLoading(false);
      setUserMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const closeChatbox = () => {
    setIsOpen(false);
  };

  return (
    <div style={ChatbotStyles.chatContainer}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={ChatbotStyles.openButton}>
        Hỏi trợ lý ảo
        </button>
      )}
      {isOpen && (
        <div style={ChatbotStyles.chatBox}>
          <div style={ChatbotStyles.header}>
            <div style={ChatbotStyles.title}>Chatbot🤖</div>
            <button onClick={closeChatbox} style={ChatbotStyles.closeButton}>❌</button>
          </div>
          <div style={ChatbotStyles.chatContent}>
            {loading ? (
              <p>Đang gửi...</p>
            ) : (
              <p>{botResponse ? botResponse : 'Trợ lý ảo đang chờ câu hỏi của bạn...'}</p>
            )}

            {error && <p style={ChatbotStyles.error}>{error}</p>}
          </div>

          <div style={ChatbotStyles.inputContainer}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              style={ChatbotStyles.input}
            />
            <button onClick={handleSendMessage} style={ChatbotStyles.sendButton}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
