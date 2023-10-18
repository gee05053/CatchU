import React from "react";
import { Modal, Input, Form, Select, message, Button } from "antd";
import axios from "axios";

type SignUpProps = {
	isSignUpOpen: boolean;
	setSignUpOpen(value: boolean): void;
};

const SignUpModal: React.FC<SignUpProps> = ({
	isSignUpOpen,
	setSignUpOpen,
}) => {
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 6 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 14 },
		},
	};

	const onSubmit = async () => {
		const inputValue = form.getFieldsValue();
		let body = {
			name: inputValue.name,
			id: inputValue.id,
			password: inputValue.password,
			email: inputValue.email,
			position: inputValue.position,
		};
		try {
			const result = await axios.post("/account/signup", body);
			if (result.data.success) {
				form.setFieldsValue({
					name: undefined,
					id: undefined,
					password: undefined,
					email: undefined,
					position: undefined,
				});
				setSignUpOpen(false);
				messageApi.open({
					type: "success",
					content: "회원가입 성공",
				});
			} else {
				messageApi.open({
					type: "error",
					content: "알수없는 오류 발생",
				});
			}
		} catch {
			messageApi.open({
				type: "error",
				content: "알수없는 오류 발생으로 회원가입에 실패했습니다.",
			});
		}
	};
	return (
		<>
			{contextHolder}
			<Modal
				title="회원가입"
				open={isSignUpOpen}
				centered
				onCancel={() => setSignUpOpen(false)}
				footer={[
					<Button
						htmlType="submit"
						onClick={form.submit}
					>
						가입하기
					</Button>,
				]}
			>
				<Form
					{...formItemLayout}
					form={form}
					layout="horizontal"
					onFinish={onSubmit}
				>
					<Form.Item
						name="name"
						label="이름"
						rules={[
							{
								required: true,
								message: "이름을 입력하세요.",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="id"
						label="ID"
						rules={[
							{
								required: true,
								message: "아이디를 입력하세요.",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[_\W]).{8,}$/,
								message:
									"비밀번호는 특수문자를 포함한 8자리 이상이어야 합니다.",
							},
						]}
					>
						<Input type="password" />
					</Form.Item>
					<Form.Item
						name="email"
						label="E-mail"
						rules={[
							{
								required: true,
								message: "이메일을 입력하세요.",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="position"
						label="Position"
						rules={[
							{
								required: true,
								message: "포지션을 골라주세요.",
							},
						]}
					>
						<Select
							options={[
								{ value: "Company", label: "회사" },
								{ value: "User", label: "구직자" },
							]}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default SignUpModal;
