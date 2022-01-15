import React from 'react'
import Logo from './logo.png'
import { AppBar, Toolbar } from '@material-ui/core'

function Appbar(props) {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar className="toolbar">
        <div className="appbar-left">
          <img className="logo" src={Logo} alt="Logo" />
          <span className="app-name">
            NTU Food Bank
          </span>
        </div>
        <div className="appbar-right">
          {props.signedIn ? <span className="app-name">Hi! {props.username}</span> : <></>}
          {props.signedIn ? <span className='app-name' onClick={()=>{props.setUserInfoVisible(true);}}>UserInfo</span> : <></>}
          {props.signedIn ? <span className='app-name' onClick={()=>{props.setSignedIn(false);props.navigate('/');}}>log out</span> : <></>}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
