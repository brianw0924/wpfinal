import React, { useState, useEffect } from "react"
import moment from "moment"
import {
  POST_DETAIL_QUERY, 
  ORDER_MUTATION,
  DELETE_POST_MUTATION
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
  const { pid } = useParams()
  const [detail, setDetail] = useState(null)
  const { data, subscribeToMore } = useQuery(POST_DETAIL_QUERY, {
    variables: { postId: pid, },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const [order] = useMutation(ORDER_MUTATION);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  useEffect(() => {
      console.log("check1");
      subscribeToMore({
        document: ORDER_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log("check2");
          // console.log(subscriptionData.data);
          return {
            postDetail: subscriptionData.data.orderCreated
          };
        },
      });
  }, [subscribeToMore]);
  
  
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

  // fetch the full information of a post from database
  useEffect(() => {
    if (!data) return;
    setDetail(data.postDetail);
  }, [data])
  
  return (
    <div className="article-wrapper">
      <div id="goback-btn">
        <Button variant="contained" color="primary" id="goback-reply-btn" onClick={() => props.navigate(-1)}>Back</Button>
      </div>

      {detail ?
        <div className="article-container">
          <div className="article-title" id="pid-detail-title">
            {detail.title}

            {/* trigger the delPost function when click */}
            <IconButton disabled={username!=detail.from} onClick={delPost} className="post-delete" size="small" id="pid-detail-del-btn">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="article-time">
            <span id="pid-detail-time">{moment(detail.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-content">
              {detail.content}
            </Typography>
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-from">
              {`Location: ${detail.location}`}
            </Typography>
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-from">
              {`Left: ${detail.number}`}
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
