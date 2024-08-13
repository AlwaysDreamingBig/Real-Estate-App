import React, { useEffect } from 'react';

const ChatbotHelpSection = () => {
  useEffect(() => {
    // Tawk.to will automatically render after the script is added in public/index.html
  }, []);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Need Help? Chat with Us</h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or need support? Start a live chat with our team and get instant help.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
              onClick={() => window.Tawk_API.toggle()}
            >
              Start Chat
            </button>
          </div>
        </div>
        {/* FAQs section here */}
      </div>
    </section>
  );
};

export default ChatbotHelpSection;
