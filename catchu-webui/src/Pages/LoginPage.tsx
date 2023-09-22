import React, { useContext } from "react";
import { Input, Button, Card, Divider, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
	const { setIsLogin } = useContext(LoginContext);
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();

	const onFinish = async (value: any) => {
		if (value.id === "" || value.id === undefined) {
			messageApi.open({
				type: "error",
				content: "아이디를 입력하세요",
			});
		} else {
			let body = {
				id: value.id,
				password: value.password,
			};
			const result = await axios.post("/user/login", body);
			if (result.data.length === 0) {
				messageApi.open({
					type: "error",
					content: "아이디와 비밀번호를 확인해주세요",
				});
			} else {
				setIsLogin(true);
				navigate("/");
			}
		}
	};
	return (
		<>
			{contextHolder}
			<Form
				onFinish={onFinish}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
					flexDirection: "column",
				}}
			>
				<Card
					title="CatchU"
					style={{ width: "30%", margin: "20px" }}
				>
					<Form.Item
						name="id"
						style={{ marginBottom: 0 }}
					>
						<Input
							size="large"
							placeholder="아이디"
							prefix={<UserOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[_\W]).{8,}$/,
								message:
									"비밀번호는 특수문자를 포함한 8자리 이상이어야 합니다.",
							},
						]}
					>
						<Input
							size="large"
							type="password"
							placeholder="비밀번호"
							prefix={<LockOutlined />}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							block
							htmlType="submit"
						>
							로그인
						</Button>
					</Form.Item>
				</Card>
				<div style={{ color: "#8d8d8d" }}>
					아이디 찾기
					<Divider
						type="vertical"
						style={{ backgroundColor: "#dadada" }}
					/>
					비밀번호 찾기
					<Divider
						type="vertical"
						style={{ backgroundColor: "#dadada" }}
					/>
					회원가입
				</div>
			</Form>
		</>
	);
};

export default LoginPage;
