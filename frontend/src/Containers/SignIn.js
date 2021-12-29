import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import styled from 'styled-components';

const SignInWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: top;
	height: 100vh;
	width: 500px;
	margin: auto;
`;

const SignIn = ({ username, setUsername, setStatus, navigate}) => {
    return (
        <>
            <Title>
                <h1>Don't waste! Giveaway!</h1>
            </Title>
            <SignInWrapper>
            <Input.Search
                prefix={<UserOutlined/>}
                value={username}
                enterButton = "Sign In"
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Enter your name"
                size="large"
                style={{width:300, margin:50}}
                onSearch={()=>{
                    if(!username){
                        setStatus({
							type:'error', 
							msg:'Please enter an username and a message body.'
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