import React, { useContext, useState } from "react";
import {
	Input,
	Button,
	Card,
	Divider,
	Form,
	message,
	Row,
	Col,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import SignUpModal from "../Components/SignUpModal";
import IdFindModal from "../Components/IdFindModal";
import PasswordFindModal from "../Components/PasswordFindModal";

const LoginPage: React.FC = () => {
	const { setIsLogin, setUserData } = useContext(LoginContext);
	const [isSiginUpOpen, setSignUpOpen] = useState<boolean>(false);
	const [isIdFindModalOpen, setIdFindModalOpen] = useState<boolean>(false);
	const [isPasswordFindModalOpen, setPasswordFindModalOpen] =
		useState<boolean>(false);
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
			try {
				const result = await axios.post("/account/login", body);
				if (result.data.user.length === 0) {
					messageApi.open({
						type: "error",
						content: "아이디와 비밀번호를 확인해주세요",
					});
				} else {
					window.sessionStorage.setItem(
						"userData",
						JSON.stringify(result.data.user[0]),
					);
					setUserData(result.data.user[0]);
					setIsLogin(true);
					navigate("/");
				}
			} catch {
				messageApi.open({
					type: "error",
					content: "서버에 에러가 발생하여 로그인을 할 수 없습니다.",
				});
			}
		}
	};
	return (
		<Row
			justify="center"
			align="middle"
			style={{ height: "100vh" }}
		>
			<Col
				xs={24}
				sm={24}
				md={12}
				lg={6}
			>
				{contextHolder}
				<Form onFinish={onFinish}>
					<Card title="CatchU">
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
					<Col style={{ textAlign: "center", marginTop: "5px" }}>
						<Button
							type="link"
							style={{ padding: 0, color: "#8d8d8d" }}
							onClick={() => setIdFindModalOpen(true)}
						>
							아이디 찾기
						</Button>
						<Divider
							type="vertical"
							style={{ backgroundColor: "#dadada" }}
						/>
						<Button
							type="link"
							style={{ padding: 0, color: "#8d8d8d" }}
							onClick={() => setPasswordFindModalOpen(true)}
						>
							비밀번호 찾기
						</Button>
						<Divider
							type="vertical"
							style={{ backgroundColor: "#dadada" }}
						/>
						<Button
							type="link"
							style={{ padding: 0, color: "#8d8d8d" }}
							onClick={() => setSignUpOpen(true)}
						>
							회원가입
						</Button>
					</Col>
				</Form>
			</Col>
			<IdFindModal
				isIdFindModalOpen={isIdFindModalOpen}
				setIdFindModalOpen={setIdFindModalOpen}
			/>
			<PasswordFindModal
				isPasswordFindModalOpen={isPasswordFindModalOpen}
				setPasswordFindModalOpen={setPasswordFindModalOpen}
			/>
			<SignUpModal
				isSignUpOpen={isSiginUpOpen}
				setSignUpOpen={setSignUpOpen}
			/>
		</Row>
	);
};

export default LoginPage;
