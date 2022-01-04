import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import { 
  ALL_POSTS_QUERY,
  POST_CREATED_SUBSCRIPTION,
} from "../graphql";
import { useQuery } from "@apollo/client";

function Board(props) {
  const [posts, setPosts] = useState([]);
  
  // fetch all posts from database
  const { data, subscribeToMore } = useQuery(ALL_POSTS_QUERY);
  useEffect(() => {
    if (!data) return;
    setPosts(data.allPosts);
  }, [data])
  
  // subscription to post created
  useEffect(() => {
    subscribeToMore({
      document: POST_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          allPosts: [subscriptionData.data.postCreated, ...prev.allPosts],
        };
      },
    });
  }, [subscribeToMore]);

  return (
    <>
      <div className="board-navbar">
        <div style={{ fontWeight: "bold", fontSize: 28 }}>Post List</div>
        <Button className="board-launch-btn" variant="contained" color="primary" id="pid-post-btn" onClick={() => props.navigate("/new")}>New Post</Button>
      </div>
      
      <div className="board-discuss-container">
        {posts.length ?
          <div className="articles-container">
            {posts.map((post, i) => (
              <div className="article-post" key={i} id={`pid-${i}`}>
                <div className="article-prefix">
                  <span className="each-tag">【Food】</span> &nbsp;
                  <span className="each-id" id={`pid-${i}-title`} onClick={() => props.navigate(`/post/${post.id}`)}>{post.title}</span>
                </div>
                <div className="article-postfix">
                  <span className="each-time" id={`pid-${i}-time`}>{moment(post.timestamp).format("YYYY-MM-DD")}</span>
                </div>
              </div>
            ))}
          </div> : <div></div>
        }
      </div>
    </>
  )
}

export default Board
