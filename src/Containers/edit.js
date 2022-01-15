import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Delete as DeleteIcon, LocationOff, Send as SendIcon } from '@material-ui/icons'
import { useMutation } from "@apollo/react-hooks";
import { Radio } from 'antd';
import { 
  CREATE_POST_MUTATION,
  ALL_POSTS_QUERY,
  VALID_POSTS_QUERY,
  GIVE_POSTS_QUERY,
  OBTAIN_POSTS_QUERY,
} from "../graphql";

function Edit({ username, displayStatus, ...props }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [number, setNumber] = useState(0)
  const [location, setLocation] = useState('')
  const [hashtag, setHashtag] = useState("Food");
  const [newPost] = useMutation(CREATE_POST_MUTATION);
  
  // create a new post and save it to database
  const handleSubmit = () => {
    if(!title || !content || !location){
      displayStatus({
        type:"error",
        msg:"Leave no blanks!"
      })
      return;
    }
    if(parseInt(number) <= 0){
      displayStatus({
        type:"error",
        msg:"Number must >= 0!"
      })
      return;
    }
    newPost({
      variables: {
        input: {
          title: title.trim(),
          content: content.trim(),
          number: parseInt(number),
          location: location,
          from: username,
          hashtag: hashtag,
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: VALID_POSTS_QUERY, }, 
        { 
          query: GIVE_POSTS_QUERY, 
          variables: { user: username },
        }, 
        { 
          query: OBTAIN_POSTS_QUERY, 
          variables: { user: username },
        }
      ],
      onCompleted: () => {
        props.navigate(-1);
      },
    })
    // setTimeout(() => {
    //   props.navigate(-1);
    // }, 300)
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
        <div className="post-content-container">
          <Radio.Group 
            defaultValue="Food" 
            buttonStyle="solid"
            onChange={handleChange(setHashtag)}
          >
            <Radio.Button value="Food">Food</Radio.Button>
            <Radio.Button value="Drink">Drink</Radio.Button>
          </Radio.Group>
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
