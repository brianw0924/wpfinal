import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import "antd/dist/antd.css";
import Appbar from '../Components/appbar'
import Board from './board'
import Post from './post'
import Edit from './edit'
import NoMatch from '../Components/noMatch'
import SignIn from './SignIn'
import { Routes, Route, useNavigate } from 'react-router-dom'

const LOCALSTORAGE_USER = "save-user";
const LOCALSTORAGE_SIGNED_IN = "save-signedIn";

function Guide({ client, ...props }) {
  const navigate = useNavigate()
  const savedUsername = localStorage.getItem(LOCALSTORAGE_USER);
	const [username, setUsername] = useState("" || savedUsername);
  const savedSignedIn = localStorage.getItem(LOCALSTORAGE_SIGNED_IN);
  const [signedIn, setSignedIn] = useState(false || savedSignedIn);

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {content:msg, duration:0.5};
      switch (type){
        case 'success':
          message.success(content);
          break;
        case 'error':
          console.log(msg)
          message.error(content);
          break;
        default:
          // message.warn(content)
          message.error(content);
          break;
      }
    }
  }

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_USER, username);
      localStorage.setItem(LOCALSTORAGE_SIGNED_IN, signedIn);
    } else navigate("/");
  }, [signedIn, username]);
  
  return (
    <div className="wrapper">
      <Appbar navigate={navigate} />
      <Routes>
        <Route path="/" element={
          <SignIn
            username={username}
            setUsername={setUsername}
            displayStatus={displayStatus}
            setSignedIn={setSignedIn}
            client={client}
            navigate={navigate}
        />}/>
        <Route path="/main" element={<Board navigate={navigate} />} />
        <Route path="/post/:pid" element={<Post username={username} navigate={navigate} />} />
        <Route path="/new" element={<Edit username={username} navigate={navigate} />} />
        <Route element={<NoMatch navigate={navigate} />} />
      </Routes>
    </div>
  )
}

export default Guide
