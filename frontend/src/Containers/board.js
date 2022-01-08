import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import { Tabs } from 'antd';
import { 
  ALL_POSTS_QUERY,
  VALID_POSTS_QUERY,
  OBTAIN_POSTS_QUERY,
  GIVE_POSTS_QUERY,
  POST_CREATED_SUBSCRIPTION,
} from "../graphql";
import { useQuery } from "@apollo/client";

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

function Board({username, ...props}) {
  const [posts,  setPosts]  = useState([]);
  const [orders, setOrders] = useState([]);
  const [gives,  setGives]  = useState([]);

  // fetch all posts from database
  const res1 = useQuery(VALID_POSTS_QUERY);
  const res2 = useQuery(OBTAIN_POSTS_QUERY, {variables:{user:username}})
  const res3 = useQuery(GIVE_POSTS_QUERY, {variables:{user:username}})

  useEffect(() => {
    if (!res1.data) return;
    setPosts(res1.data.validPosts);
  }, [res1.data])
  
  useEffect(() => {
    if(!res2.data) return;
    setOrders(res2.data.obtainPosts);
  }, [res2.data])

  useEffect(() => {
    if(!res3.data) return;
    setGives(res3.data.givePosts);
  }, [res3.data])

  // subscription to post created
  useEffect(() => {
    res1.subscribeToMore({
      document: POST_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          validPosts: [subscriptionData.data.postCreated, ...prev.validPosts],
        };
      },
    });
  }, [res1.subscribeToMore]);

  useEffect(() => {
    res2.subscribeToMore({
      document: POST_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          obtainPosts: [subscriptionData.data.postCreated, ...prev.obtainPosts],
        };
      },
    });
  }, [res2.subscribeToMore]);

  useEffect(() => {
    res3.subscribeToMore({
      document: POST_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          givePosts: [subscriptionData.data.postCreated, ...prev.givePosts],
        };
      },
    });
  }, [res3.subscribeToMore]);

  

  return (
    <>
      <div className="board-navbar">
        <div style={{ fontWeight: "bold", fontSize: 28 }}>Post List</div>
        <Button className="board-launch-btn" variant="contained" color="primary" id="pid-post-btn" onClick={() => props.navigate("/new")}>New Post</Button>
      </div>
      
      <div className="board-discuss-container">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Others food" key="1" style={{"font-weight": "bold"}}>
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
          </TabPane>
          <TabPane tab="My order" key="2">
            {orders.length ?
                <div className="articles-container">
                  {orders.map((post, i) => (
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
          </TabPane>
          <TabPane tab="My food" key="3">
            {gives.length ?
                <div className="articles-container">
                  {gives.map((post, i) => (
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
          </TabPane>
        </Tabs>
        
      </div>
    </>
  )
}

export default Board
