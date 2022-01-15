import React from 'react'
import Logo from './logo.png'
import { AppBar, Toolbar } from '@material-ui/core'
import { USER_DETAIL_QUERY } from '../graphql'

function Appbar(props) {
  const queryUserInfo = async () => {
    console.log("here1")
    console.log(props.client)
    const { data } = await props.client.query({
      query: USER_DETAIL_QUERY,
      variables: { 
        user: props.username
      },
    })
    props.setN_order(data.n_order)
    props.setN_give(data.give.length)
    props.setUserId(data.id)
    console.log(data)
    return;
  }

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
          {props.signedIn === true ? <span className="app-name">Hi! {props.username}</span> : <></>}
          {props.signedIn === true ? <span className='app-name' onClick={()=>{queryUserInfo(); props.setUserInfoVisible(true);}}>UserInfo</span> : <></>}
          {props.signedIn === true ? <span className='app-name' onClick={()=>{
            props.setSignedIn(false);
            props.navigate('/');
            localStorage.setItem(props.local, false);
            }}>log out</span> : <></>}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
