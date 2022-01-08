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

  // fetch all posts from database
  const VALID = useQuery(VALID_POSTS_QUERY);
  const OBTAIN = useQuery(OBTAIN_POSTS_QUERY, {variables:{user:username}})
  const GIVE = useQuery(GIVE_POSTS_QUERY, {variables:{user:username}})

  // subscription to post created
  useEffect(() => {
      VALID.subscribeToMore({
        document: POST_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            validPosts: [subscriptionData.data.postCreated, ...prev.validPosts],
          };
        },
      });
  }, [VALID.subscribeToMore]);

  useEffect(() => {
    OBTAIN.subscribeToMore({
      document: POST_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          obtainPosts: [subscriptionData.data.postCreated, ...prev.obtainPosts],
        };
      },
    });
  }, [OBTAIN.subscribeToMore]);

  useEffect(() => {
    GIVE.subscribeToMore({
      document: POST_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          givePosts: [subscriptionData.data.postCreated, ...prev.givePosts],
        };
      },
    });
  }, [GIVE.subscribeToMore]);

  

  return (
    <>
      <div className="board-navbar">
        <div style={{ fontWeight: "bold", fontSize: 28 }}>Post List</div>
        <Button className="board-launch-btn" variant="contained" color="primary" id="pid-post-btn" onClick={() => props.navigate("/new")}>New Post</Button>
      </div>
      
      <div className="board-discuss-container">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Others food" key="1" style={{"font-weight": "bold"}}>
              { VALID.loading ?  <div></div> :
              <div className="articles-container">
                {VALID.data.validPosts.map((post, i) => (
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
              </div>
              }

          </TabPane>
          <TabPane tab="My order" key="2">
            { OBTAIN.loading ? <div></div> :
                <div className="articles-container">
                  {OBTAIN.data.obtainPosts.map((post, i) => (
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
                </div>
              }
          </TabPane>
          <TabPane tab="My food" key="3">
            { GIVE.loading ? <div></div> :
                <div className="articles-container">
                  {GIVE.data.givePosts.map((post, i) => (
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
                </div>
              }
          </TabPane>
        </Tabs>
        
      </div>
    </>
  )
}

export default Board
