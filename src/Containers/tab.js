import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { 
    POST_CREATED_SUBSCRIPTION,
    POST_DELETED_SUBSCRIPTION
} from "../graphql";
import moment from "moment";

function Tab({query_fn, post_type, username, ...props}){

    const {data, subscribeToMore, loading} = 
        useQuery(
            query_fn, 
            { 
                variables: { user:username },
                fetchPolicy: "cache-and-network",
                nextFetchPolicy: "cache-first", 
            },
        );

    useEffect(() => {
        console.log("here")        
        subscribeToMore({
          document: POST_CREATED_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            console.log("fuck")
            if (!subscriptionData.data) return prev;
            var cur = {};
            cur[post_type] = [subscriptionData.data.postCreated, ...prev[post_type]];
            return cur
            // return {
            //   post_type: [subscriptionData.data.postCreated, ...prev.validPosts],
            // };
          },
        });
    }, [subscribeToMore]);

    useEffect(() => {      
        subscribeToMore({
          document: POST_DELETED_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            var cur = {};
            cur[post_type] = prev[post_type].filter((t) =>{return t.id != subscriptionData.data.postDeleted })
            return cur
            // return {
            //     tasks: prev.tasks.filter((t) =>{return t.id != subscriptionData.data.taskDeleted }),
            //   };
          },
        });
    }, [subscribeToMore]);
    return (
        <>
        { loading ?  <div></div> :
            <div className="articles-container">
                {data[post_type].map((post, i) => (
                <div className="article-post" key={i} id={`pid-${i}`}>
                    <div className="article-prefix">
                    <span className="each-tag">【{post.hashtag}】</span> &nbsp;
                    <span className="each-id" id={`pid-${i}-title`} onClick={() => props.navigate(`/post/${post.id}/${post_type}`)}>{post.title}</span>
                    </div>
                    <div className="article-postfix">
                    <span className="each-time" id={`pid-${i}-time`}>{moment(post.timestamp).format("YYYY-MM-DD")}</span>
                    </div>
                </div>
                ))}
            </div>
        }
        </>
    )
}

export default Tab