import { Button } from "antd";
import axios from "./api";
import { v4 as uuidv4 } from 'uuid'

function App() {
  let id = null;
  return (
    <div className="App">
      <Button
        onClick={async () => {
          id = uuidv4();
          console.log(id);
          const {
            data: { message },
          } = await axios.post('/newPost', {
            postId: id,
            title: "新竹美食",
            content: "如題",
            number: 10,
            timestamp: Date.now(),
            location: "BL603",
            from: "猥維開剁",
          });
          console.log(message);
        }}
      >
        new post
      </Button>
      <Button
        onClick={async () => {
          console.log(id);
          const {
            data: { message },
          } = await axios.post('/order', {
            postId: id,
            user: "薇薇葆兒",
          });
          console.log(message);
        }}
      >
        order
      </Button>
    </div>
  );
}

export default App;
