import React from "react";
import { Input, Button, Card, Divider, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage: React.FC = () => {
	return (
		<Form
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
				style={{ width: "40%", margin: "20px" }}
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
					rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
				>
					<Input
						size="large"
						type="password"
						placeholder="비밀번호"
						prefix={<LockOutlined />}
					/>
				</Form.Item>
				<Button block>로그인</Button>
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
	);
};

export default LoginPage;
