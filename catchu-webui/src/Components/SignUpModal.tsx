import React from "react";
import { Modal, Input, Form, Select } from "antd";

type SignUpProps = {
	isSignUpOpen: boolean;
	setSignUpOpen(value: boolean): void;
};

const SignUpModal: React.FC<SignUpProps> = ({
	isSignUpOpen,
	setSignUpOpen,
}) => {
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

	return (
		<Modal
			title="회원가입"
			open={isSignUpOpen}
			centered
			onCancel={() => setSignUpOpen(false)}
		>
			<Form
				{...formItemLayout}
				layout="horizontal"
			>
				<Form.Item label="이름">
					<Input />
				</Form.Item>
				<Form.Item label="ID">
					<Input />
				</Form.Item>
				<Form.Item label="Password">
					<Input />
				</Form.Item>
				<Form.Item label="E-mail">
					<Input />
				</Form.Item>
				<Form.Item label="Position">
					<Select
						defaultValue="user"
						options={[
							{ value: "company", label: "회사" },
							{ value: "user", label: "구직자" },
						]}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default SignUpModal;
