import { Input, Button } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import styled from 'styled-components';
import { GET_USER_QUERY } from "../graphql";
import { useState } from "react";
import SignUp from "../Components/SignUp";

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 500px;
  margin: auto;
`;

const SignIn = ({ username, setUsername, displayStatus, setSignedIn, client, navigate}) => {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [password, setPassword] = useState("");
  // setSignedIn(false);
  return (
    <>
      <Title style={{margin:50}}>
          <h1>Don't waste! Giveaway!</h1>
      </Title>
      <SignUp
        signUpVisible={signUpVisible}
        setSignUpVisible={setSignUpVisible}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        displayStatus={displayStatus}
      />
      <SignInWrapper>
        <Input 
          prefix={<UserOutlined/>}
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          placeholder="Enter your name"
          size="large"
          style={{ width:300, margin:5}}
        />
        <Input.Search
          prefix={<KeyOutlined/>}
          type="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          placeholder="password"
          size="large"
          style={{ width:300, margin:5}}
          enterButton={<Button disabled={!username || !password} type="primary">Sign In</Button>}
          onSearch={async () => {
            const { data } = await client.query({
              query: GET_USER_QUERY,
              variables: { 
                name: username,
                password: password,
              },
              fetchPolicy: "no-cache",
            })
            if (data.findUser === "success") {
              displayStatus({
                type: "success",
                msg: "Logged In!",
              })
              setSignedIn(true);
              navigate('/main')
            } else {
              displayStatus({
                type: "error",
                msg: data.findUser,
              })
            }
          }}
        />
        <Button 
          type="primary" style={{margin:5}}
          danger onClick={() => setSignUpVisible(true)}>
          Sign Up
        </Button>
      </SignInWrapper>
      
    </>
  )
}

export default SignIn;