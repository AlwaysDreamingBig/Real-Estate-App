import React, { useState } from 'react';

const ContactAdvisor = ({ advisor, sender, onClose }) => {
  const [message, setMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      return;
    }

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const newMessage = {
      sender,
      receiver: advisor.name,
      date,
      time,
      message,
    };

    setSubmittedMessages([...submittedMessages, newMessage]);
    setMessage('');
  };

  return (
    <div className="contact-advisor bg-white p-4 rounded shadow-md h-[400px] w-[400px]">
      <h2 className="font-bold text-xl mb-4">Contact {advisor.name}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="4"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>

      <div className="messages-list">
        {submittedMessages.length === 0 ? (
          <p>No messages sent yet.</p>
        ) : (
          submittedMessages.map((msg, index) => (
            <div key={index} className="message p-2 mb-2 border border-gray-300 rounded">
              <p className="font-bold">{msg.sender} to {msg.receiver}</p>
              <p className="text-gray-600">{msg.date} at {msg.time}</p>
              <p className="mt-1">{msg.message}</p>
            </div>
          ))
        )}
      </div>
      <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Close</button>
    </div>
  );
};

export default ContactAdvisor;
