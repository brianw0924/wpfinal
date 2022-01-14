import { Input, Modal } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER_MUTATION } from "../graphql";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

export default function SignUp({ 
  signUpVisible,
  setSignUpVisible,
  username,
  setUsername,
  password,
  setPassword,
  displayStatus,
}) {
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  return (
    <>
      <Modal
        visible={signUpVisible}
        onOk={async () => {
          const { data } = await createUser({
            variables: {
              name: username,
              password: password,
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
          prefix={<UserOutlined/>}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="user"
        ></Input>
        <Input
          prefix={<KeyOutlined/>}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></Input>
      </Modal>
    </>
  )
}