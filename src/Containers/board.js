import { Button } from "@material-ui/core";
import { Tabs } from 'antd';
import { 
  VALID_POSTS_QUERY,
  OBTAIN_POSTS_QUERY,
  GIVE_POSTS_QUERY,
} from "../graphql";
import Tab from './tab'

const { TabPane } = Tabs;
function Board({username, ...props}) {
  return (
    <>
      <div className="board-navbar">
        <div style={{ fontWeight: "bold", fontSize: 28 }}>Post List</div>
        <Button className="board-launch-btn" variant="contained" color="primary" id="pid-post-btn" onClick={() => props.navigate("/new")}>New Post</Button>
      </div>
      
      <div className="board-discuss-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Others food" key="1" style={{"font-weight": "bold"}}>
            <Tab username={username} query_fn={VALID_POSTS_QUERY} post_type={"validPosts"} navigate={props.navigate}/>
          </TabPane>
          <TabPane tab="My order" key="2">
            <Tab username={username} query_fn={OBTAIN_POSTS_QUERY} post_type={"obtainPosts"} navigate={props.navigate}/>
          </TabPane>
          <TabPane tab="My food" key="3">
              <Tab username={username} query_fn={GIVE_POSTS_QUERY} post_type={"givePosts"} navigate={props.navigate}/>
          </TabPane>
        </Tabs>
        
      </div>
    </>
  )
}

export default Board
