import React, { useState, useEffect } from "react"
import moment from "moment"
import {
  POST_DETAIL_QUERY, 
  ORDER_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_OBTAINPOST_MUTATION
} from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom"
import { IconButton, Button, Typography } from "@material-ui/core"
import { Delete as DeleteIcon } from "@material-ui/icons"
import styled from "styled-components";
import { 
    ORDER_CREATED_SUBSCRIPTION,
} from "../graphql";
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px
`

// todo: show number, user...
function Post({ username, ...props }) {
  const { pid, type} = useParams()
  const { data, loading, subscribeToMore } = useQuery(POST_DETAIL_QUERY, {
    variables: { postId: pid, },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const [order] = useMutation(ORDER_MUTATION);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const [deleteObtainPost] = useMutation(DELETE_OBTAINPOST_MUTATION);
  useEffect(() => {
    subscribeToMore({
      document: ORDER_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          postDetail: subscriptionData.data.orderCreated
        };
      },
    });
  }, [subscribeToMore]);
  
  const delObtainPost = async () => {
    deleteObtainPost({
      variables: {
        name:username,
        postId:pid,
      },
      // refetchQueries: [GET_TASKS_QUERY],
      // onError: (err) => {
      //   console.log(err);
      // },
    });
    setTimeout(() => {
      props.navigate(-1)
    }, 300)
  }
  // delete a post from database
  const delPost = async () => {
    console.log(`${pid}`)
    deletePost({
      variables: {
        postId:pid,
      },
      // refetchQueries: [GET_TASKS_QUERY],
      // onError: (err) => {
      //   console.log(err);
      // },
    });
    setTimeout(() => {
      props.navigate(-1)
    }, 300)
  }
  const orderFood = async () => {
    const msg = await order({
      variables: {
        name: username,
        postId: pid,
      }
    });
    // console.log(msg)
    // todo deal with success or failed
    props.navigate(-1);
  }
  
  return (
    <div className="article-wrapper">
      <div id="goback-btn">
        <Button variant="contained" color="primary" id="goback-reply-btn" onClick={() => props.navigate(-1)}>Back</Button>
      </div>

      {loading ? <div className="article-container"></div> : 
        <div className="article-container">
          <div className="article-title" id="pid-detail-title">
            {data.postDetail.title}

            {/* trigger the delPost function when click */}
            <IconButton disabled={username!=data.postDetail.from} onClick={delPost} className="post-delete" size="small" id="pid-detail-del-btn">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="article-time">
            <span id="pid-detail-time">{moment(data.postDetail.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-content">
              {data.postDetail.content}
            </Typography>
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-from">
              {`Location: ${data.postDetail.location}`}
            </Typography>
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-from">
              {`Left: ${data.postDetail.number}`}
            </Typography>
          </div>
          <ButtonWrapper>
            {type=="validPosts" ? <Button variant="contained" color="primary" id="order-btn" onClick={()=>{orderFood()}}>我想要這個酷東西</Button>
            : type == "obtainPosts" ? <Button variant="contained" color="primary" id="order-btn" onClick={()=>{delObtainPost(username, pid)}}>完成領取</Button>
            : <></>}
          </ButtonWrapper>
        </div>
      }
    </div>
  );
}

export default Post
