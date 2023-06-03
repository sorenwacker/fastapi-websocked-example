import React, { useState, useEffect } from 'react';

const App = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState("");

  useEffect(() => {
    setWs(new WebSocket('ws://localhost:8000/ws'));
  }, []);

  useEffect(() => {
    if(ws) {
      ws.onmessage = evt => {
        setReceived(evt.data);
      }
    }
  }, [ws]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if(ws) {
      ws.send(value);
    }
  };

  return (
    <div>
      <input
        value={message}
        onChange={handleChange}
      />
      <p>Received: {received}</p>
    </div>
  );
};

export default App;
