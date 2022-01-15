import React from 'react'
import Logo from './logo.png'
import { AppBar, Toolbar } from '@material-ui/core'

function Appbar(props) {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar className="toolbar">
        <div className="appbar-left">
          <img className="logo" src={Logo} alt="Logo" />
          <span className="app-name" onClick={() => props.navigate('/')}>
            NTU Food Bank
          </span>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
