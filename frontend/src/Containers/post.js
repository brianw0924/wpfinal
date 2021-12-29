import React, { useState, useEffect } from 'react'
import moment from 'moment'
import instance from '../instance'

import { useParams } from 'react-router-dom'
import { IconButton, Button, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import styled from 'styled-components';
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px
`

function Post(props) {
  const { pid } = useParams()
  const [data, setData] = useState(null)

  // get the full information of a post from database
  const getPostDetail = async () => {
    const {
      data: {post}
    } = await instance.get('/postDetail', {
      params: {
        pid
      }
    });
    setData(post);
  }

  // delete a post from database
  const delPost = async () => {
    await instance.delete('/post', {
      params: {
        pid
      }
    });
    setTimeout(() => {
      props.navigate(-1)
    }, 300)
  }

  const orderFood = async () => {
    const {
      data: { message },
    } = await instance.post('/order', {
      postId: pid,
      user: "薇薇葆兒",
    });
    props.navigate(-1);
  }

  // fetch the full information of a post from database
  useEffect(() => {
    getPostDetail();
  }, [])
  
  return (
    <div className="article-wrapper">
      <div id="goback-btn">
        <Button variant="contained" color="primary" id="goback-reply-btn" onClick={() => props.navigate(-1)}>Back</Button>
      </div>

      {data ?
        <div className="article-container">
          <div className="article-title" id="pid-detail-title">
            {data.title}

            {/* trigger the delPost function when click */}
            <IconButton onClick={delPost} className="post-delete" size="small" id="pid-detail-del-btn">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="article-time">
            <span id="pid-detail-time">{moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <div className="article-content-container">
            <Typography component={'span'} id="pid-detail-content">
              {data.content}
            </Typography>
          </div>
          <div className="article-content-container">
            <Typography component={'span'} id="pid-detail-from">
              {`Location: ${data.location}`}
            </Typography>
          </div>
          <ButtonWrapper>
            <Button variant="contained" color="primary" id="order-btn" onClick={()=>{orderFood()}}>我想要這個酷東西</Button>
          </ButtonWrapper>
        </div> : <div className="article-container"><h1>Post not found</h1></div>
      }
    </div>
  );
}

export default Post
