import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import { FiChevronDown } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import Logo from "../../assets/icon.png";
//import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Chatbot = ({ setBotIsOpen }) => {
  
  const [chats, setChats] = useState([
    {
      id: 212,
      text: "Hi, what would you like to ask?",
      sender: "robot",
    },
  ]);
  const [input, setInput] = useState('');
  const boxRef = useRef(0);
  const [typing, setTyping] = useState(false);
  

  useEffect(() => {
    boxRef.current.scrollTo(-20, 10000000000);
  }, [chats]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setChats((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" },
    ]);
    boxRef.current.scrollTo(-20, 10000000000);
    setTyping(true);
    const response = await generateResponse(input);

    setInput("");
    setTyping(false);
    setChats((prev) => [
      ...prev,
      { id: Date.now(), text: response, sender: "robot" },
    ]);
   console.log(response);
  };

  const generateResponse = async (text) => {
    const API_KEY = "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";
  
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'assistant', content: text}],
        max_tokens: 100,
      }),
    };
    try {
      const responsemain = await fetch(
        'https://api.openai.com/v1/chat/completions',
        options,
      );
      const data = await responsemain.json();
      console.log(data.choices[0].message.content )
      return data.choices[0].message.content 
  
    } catch (error) {
      console.error(error);
    }
  };
  const currentUser = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate(); 
  useEffect(() => {
      currentUser === null && navigate("/auth")
    },[currentUser, navigate]);
  return (
    <div className="chatbot-outer">
      <div className="chatbox-container">
        <div className="header">
          <div className="left-header">
            <div className="stack-logo">
              <img src={Logo} alt="" />
            </div>
            <span className="header-title">Iris</span>
          </div>
          <button onClick={() => setBotIsOpen(false)}>
            <FiChevronDown />
          </button>
        </div>
        <div className="chats-box" ref={boxRef}>
          {chats?.map((chat) => {
            return (
              <div className={chat.sender} key={chat.id}>
                <span>{chat.text}</span>
              </div>
            );
          })}
          {typing && <span className="typing">Typing...</span>}
        </div>
        <form onSubmit={sendMessage}>
          <div className="footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button type="submit">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
