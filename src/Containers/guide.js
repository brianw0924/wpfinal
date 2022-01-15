import React, { useState, useEffect } from 'react'
import { message, Modal, Button } from 'antd'
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

message.config({
  top: 80,
});

function Guide({ client, ...props }) {
  const navigate = useNavigate()
  const savedUsername = localStorage.getItem(LOCALSTORAGE_USER);
	const [username, setUsername] = useState("" || savedUsername);
  const savedSignedIn = localStorage.getItem(LOCALSTORAGE_SIGNED_IN);
  const [signedIn, setSignedIn] = useState(false || savedSignedIn);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  console.log(username, signedIn)
  
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {content:msg, duration:1};
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
      <Appbar username={username} local={LOCALSTORAGE_SIGNED_IN} signedIn={signedIn} setSignedIn={setSignedIn} setUserInfoVisible={setUserInfoVisible} navigate={navigate} />
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
        <Route path="/main" element=
          {<Board username={username} navigate={navigate}/>} 
        />
        <Route path="/post/:pid" element=
          {<Post username={username} navigate={navigate} />} />
        <Route path="/new" element=
          {<Edit username={username} navigate={navigate} displayStatus={displayStatus}/>} />
        <Route element={<NoMatch navigate={navigate} />} />
      </Routes>
      <Modal
        visible={userInfoVisible}
        onCancel={() => {
          setUserInfoVisible(false);
        }}
        title="User Info"
        footer = {[
          <Button onClick={()=>{setUserInfoVisible(false);}}>OK</Button>
        ]}
      >
        <p>userid</p>
        <p>Username: {username}</p>
        <p>#order</p>
        <p>#give</p>
      </Modal>
    </div>
  )
}

export default Guide
