import { Input, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import styled from 'styled-components';
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER_MUTATION, GET_USER_QUERY } from "../graphql";
import { useState } from "react";

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const SignIn = ({ username, setUsername, displayStatus, client, navigate}) => {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [signUpVisible, setSignUpVisible] = useState(false);

  return (
    <>
      <Title>
          <h1>Don't waste! Giveaway!</h1>
          <Button type="primary" danger onClick={() => setSignUpVisible(true)}>
              Sign Up
          </Button>
      </Title>
      <>
        <Modal
          visible={signUpVisible}
          onOk={async () => {
            const { data } = await createUser({
              variables: {
                name: username,
              },
            });
            if (data.createUser === "exist") {
              displayStatus({ 
                type: "error",
                msg: "User name has been used."
              })
            }
            setSignUpVisible(false);
          }}
          onCancel={() => {
            setSignUpVisible(false);
          }}
          title="Sign Up"
          okButtonProps={{ disabled: username === "" }}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="user"
          ></Input>
        </Modal>
      </>
      <SignInWrapper>
      <Input.Search
        prefix={<UserOutlined/>}
        value={username}
        onChange={(e)=>{setUsername(e.target.value)}}
        placeholder="Enter your name"
        size="large"
        style={{width:300, margin:50}}
        enterButton={<Button disabled={!username} type="primary">Sign In</Button>}
        onSearch={async () => {
          const { data } = await client.query({
            query: GET_USER_QUERY,
            variables: { name: username, },
          })
          if (!data.findUser) {
            displayStatus({
              type: "error",
              msg: "User not found."
            })
            return;
          }
          navigate('/main')
        }}
      />
      </SignInWrapper>
    </>
  )
}

export default SignIn;