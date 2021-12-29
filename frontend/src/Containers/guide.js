import React, { useState, useEffect } from 'react'
import {message} from 'antd'
import Appbar from '../Components/appbar'
import Board from './board'
import Post from './post'
import Edit from './edit'
import NoMatch from '../Components/noMatch'
import SignIn from './SignIn'
import { Routes, Route, useNavigate } from 'react-router-dom'

const LOCALSTORAGE_KEY = "saved-username";

function Guide(props) {
  const navigate = useNavigate()
  const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY);
	const [username, setUsername] = useState(savedUsername || '');
  const [status, setStatus] = useState({});

  const displayStatus = (status) => {
      if(status.msg){
        const {type, msg} = status;
        const content = {content:msg, duration:0.5};
        switch(type){
          case 'success':
            message.success(content);
            break;
          case 'error':
            message.error(content);
            break;
          default:
            message.warn(content)
            break;
        }
      }
  	}

  useEffect(()=>{
		displayStatus(status)
	},[status])

  return (
    <div className="wrapper">
      <Appbar navigate={navigate} />
      <Routes>
        <Route path="/" element={
          <SignIn
            username={username}
            setUsername={setUsername}
            setStatus={setStatus}
            navigate={navigate}
        />}/>
        <Route path="/main" element={<Board navigate={navigate} />} />
        <Route path="/post/:pid" element={<Post navigate={navigate} />} />
        <Route path="/new" element={<Edit navigate={navigate} />} />
        <Route element={<NoMatch navigate={navigate} />} />
      </Routes>
    </div>
  )
}

export default Guide
