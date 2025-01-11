import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";

const Lobby = () => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState({});
  const [name, setName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [myRoom, setMyRoom] = useState("");

  const [messages, setMessages] = useState([]);
  const [usrMessages, setUserMessages] = useState([]);


  const chatEndRef = useRef(null);


  useEffect(() => {

    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    const newSocket = io(`${import.meta.env.VITE_BACKEND}`);
    setSocket(newSocket);

    newSocket.on("updatedUserList", (data) => {
      setUsers(data);
    });

    newSocket.on("receive-message", (data) => {


      // alert(`${data.from} says: ${data.message}`);
      setMessages((messages) => [...messages, data]);


      {/* 
        from: "room"
        to: "room"
        message: "message from the user"
        */}

    });

    return () => newSocket.disconnect();
  }, []);

  const connectSocket = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required!");
      return;
    }

    socket.emit("setName", name, (response) => {
      if (response.success) {
        setIsNameEntered(true);
        setMyRoom(response.id);
        // console.log(response);
      } else {
        alert(response.message);
      }
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedUser || !message.trim()) {
      alert("Message and recipient are required!");
      return;
    }

    socket.emit("sent-message", {

      to: selectedUser, // this selecteduser will store the id
      from: socket.id,
      message: message,

    });

    setUserMessages((prevMessages) => [
      ...prevMessages,
      { to: selectedUser, from: socket.id, message }
    ]);
    setMessage("");
    // setSelectedUser(null);
  };

  console.log("selectedUser : " + selectedUser);
  console.log(messages);

  return (
    <div>
      <Navbar />
      <div className="p-6">

        {!isNameEntered ? (
          <form onSubmit={connectSocket} className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Enter Your Name</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="border p-2 w-full rounded mb-4"
            />
            <button
              type="submit"

              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"

            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Connected Users:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(users).map(([id, userName]) => (
                <div
                  key={id}
                  className={`p-4  ${myRoom === id ? 'bg-gray-300' : 'bg-white'} rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer`}
                  onClick={() => { id != myRoom && setSelectedUser(id) }}
                >
                  <h3 className="text-lg font-semibold"> {userName}</h3>
                </div>
              ))}
            </div>

            {selectedUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg w-full max-w-md">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">
                      Message {users[selectedUser]}
                    </h2>
                    <button
                      className="text-gray-500 hover:text-gray-700 text-2xl"

                      onClick={() => setSelectedUser(null)}
                    >
                      ×
                    </button>
                  </div>

                  {/* user messaging happening */}


                  <div className="h-96 overflow-y-auto mb-4 p-2">
                    {[...usrMessages, ...messages].map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.to === myRoom ? 'justify-start' : 'justify-end'} mb-2`}
                      >
                        <div
                          className={`px-4 py-2 rounded-lg ${message.to === myRoom ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                          {message.message}
                        </div>

                      </div>
                    ))}
                    {/* {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.to === myRoom ? 'justify-end' : 'justify-start'} mb-2`}
                      >
                        <div
                          className={`px-4 py-2 rounded-lg ${message.from === myRoom ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        >
                          {message.message}
                        </div>

                      </div>
                    ))} */}

                  </div>


                  <form onSubmit={sendMessage} className="p-4">
                    <textarea
                      className="border p-2 w-full rounded mb-4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
