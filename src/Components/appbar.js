import React from 'react'
import Logo from './logo.png'
import { AppBar, Toolbar } from '@material-ui/core'
import { USER_DETAIL_QUERY } from '../graphql'

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
          {(props.signedIn === true ) || (props.signedIn === "true")? <span className="app-name">Hi! {props.username}</span> : <></>}
          {(props.signedIn === true ) || (props.signedIn === "true") ? <span className='app-name' onClick={async () => {
            const username = String(props.username)
            const { data } = await props.client.query({
              query: USER_DETAIL_QUERY,
              variables: { 
                user: username
              },
              fetchPolicy: "no-cache",
            })

            props.setN_order(data.userDetail.n_order)
            props.setN_give(data.userDetail.give.length)
            props.setUserId(data.userDetail.id)
            props.setUserInfoVisible(true);
          }}>UserInfo</span> : <></>}
          {(props.signedIn === true ) || (props.signedIn === "true") ? <span className='app-name' onClick={()=>{
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
