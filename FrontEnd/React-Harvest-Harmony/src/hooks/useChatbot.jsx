// hooks/useChatbot.js
import { useEffect } from 'react';

const useChatbot = () => {
  useEffect(() => {
    // Initialize chatbase
    window.chatbase = window.chatbase || function() {
      if (!window.chatbase.q) window.chatbase.q = [];
      window.chatbase.q.push(arguments);
    };

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.id = 'F3TnSj-hHwdRiDKARPg4b';
    script.async = true;

    // Append script to body
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useChatbot;
