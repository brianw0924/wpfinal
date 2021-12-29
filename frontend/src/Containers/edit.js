import React, { useState } from 'react'
import instance from '../instance'

import { Button, TextField } from '@material-ui/core'
import { Delete as DeleteIcon, LocationOff, Send as SendIcon } from '@material-ui/icons'
import { v4 as uuidv4, v4 } from 'uuid'

function Edit(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [number, setNumber] = useState(0)
  const [location, setLocation] = useState('')
  // create a new post and save it to database 
  const handleSubmit = async () => {
    console.log('sub')
    const {
      data: { message },
    } = await instance.post('/newPost', {
        postId: uuidv4(),
        title: title.trim(),
        content: content.trim(),
        number: number,
        timestamp: Date.now(),      
        location: location,
        from: 'Wei'
    })
    setTimeout(() => {
      props.navigate(-1);
    }, 300)
  }

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  return (
    <div className="post-wrapper">
      <div className="post-text-container">
        <div style={{ fontWeight: 'Bold', fontSize: 18 }}>Giveaway some food</div>

        <div className="post-title">
          {/* TODO 4-(2): add property to Textfield to store the input */}
          <TextField
            label="Title"
            size="small"
            variant="outlined"
            className="post-title"
            id="pid-create-title"
            value={title}
            onChange={handleChange(setTitle)}
          />
        </div>

        <div className="post-content-container">
          <TextField
            label="Content"
            variant="outlined"
            className="post-content-editor"
            id="pid-create-content"
            multiline
            value={content}
            onChange={handleChange(setContent)}
          />
        </div>

        <div className="post-content-container">
          <TextField
            label="Where are you?"
            variant="outlined"
            className="post-content-editor"
            id="pid-create-content"
            multiline
            value={location}
            onChange={handleChange(setLocation)}
          />
        </div>

        <div className="post-content-container">
          <TextField
            label="Number"
            variant="outlined"
            className="post-content-editor"
            id="outlined-number"
            type="number"
            value={number}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange(setNumber)}
          />
        </div>

        <div className="post-btn-wrapper">
          <Button variant="contained" color="primary" className="post-btn" startIcon={<SendIcon />} id="pid-create-submit-btn" onClick={handleSubmit}>Submit</Button>
          <Button variant="contained" color="secondary" className="post-cancel-btn" endIcon={<DeleteIcon />} onClick={e => props.navigate(-1)}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default Edit
