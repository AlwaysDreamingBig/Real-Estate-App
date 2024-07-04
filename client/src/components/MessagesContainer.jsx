import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { initialMessages } from '../assets/constants';


const Content4 = ({className}) => {
  const [messageList, setMessageList] = useState(initialMessages);

  const addRandomMessage = () => {
    const newMessage = {
      id: messageList.length + 1,
      sender: randomSender(),
      text: getRandomMessage(),
      timestamp: getCurrentTime(),
      read: false,
    };
    setMessageList([...messageList, newMessage]);
  };

  const randomSender = () => {
    const senders = ["Alice", "Bob", "Charlie", "David"];
    return senders[Math.floor(Math.random() * senders.length)];
  };

  const getRandomMessage = () => {
    const messages = [
      "Hello! How are you today?",
      "What are your plans for the weekend?",
      "I heard the weather will be nice tomorrow.",
      "Did you see the latest movie?",
      "Let's catch up soon!",
      "How's work going?",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const markAsRead = (id) => {
    const updatedMessages = messageList.map(message => {
      if (message.id === id) {
        return { ...message, read: true };
      }
      return message;
    });
    setMessageList(updatedMessages);
  };

  return (
    <div className={`bg-blue-200 p-3 rounded-lg w-full overflow-y-auto max-h-screen`}>
        <div className={`overflow-y-auto ${className}`}>
            {messageList.map((message) => (
                <div key={message.id} className={`bg-white p-2 m-2 rounded-lg shadow-md ${message.read ? 'bg-gray-200' : 'bg-white'}`}>
                    <div className="flex justify-between items-center">
                        <div className="font-bold">{message.sender}</div>
                        <div className="text-xs text-gray-500">{message.timestamp}</div>
                    </div>

                    <div>{message.text}</div>

                    {!message.read && (
                        <div className="flex justify-end">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-1" />
                        <span className="text-xs text-gray-500">Unread</span>
                        </div>
                    )}
                    
                    <button
                        className={`mt-1 bg-blue-500 text-white px-2 py-1 rounded-lg ${message.read ? 'hidden' : ''}`}
                        onClick={() => markAsRead(message.id)}
                    >
                        Mark as Read
                    </button>
                </div>
            ))}
        </div>

        <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={addRandomMessage}
        >
        Go to Message Box
        </button>
    </div>  
  );
};

export default Content4;
