import React, { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import axios from "axios";

type IdFindModalProps = {
	isIdFindModalOpen: boolean;
	setIdFindModalOpen: (value: boolean) => void;
};
const IdFindModal: React.FC<IdFindModalProps> = ({
	isIdFindModalOpen,
	setIdFindModalOpen,
}) => {
	const [current, setCurrentValue] = useState<number>(0);
	const [findId, setFindId] =
		useState<string>("가입하신 아이디가 없습니다.");
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const onClickNext = async () => {
		const inputValue = form.getFieldsValue();
		try {
			const result = await axios.get("/account/findId", {
				params: {
					email: inputValue.email,
				},
			});
			if (result.data.findId !== undefined) {
				setFindId(`가입하신 아이디는 ${result.data.findId} 입니다.`);
			}
			setCurrentValue(current + 1);
		} catch {
			messageApi.open({
				type: "error",
				content: "아이디를 찾을 수 없습니다.",
			});
		}
	};
	const onClickClose = () => {
		form.setFieldsValue({ email: undefined });
		setFindId("가입하신 아이디가 없습니다.");
		setCurrentValue(0);
		setIdFindModalOpen(false);
	};
	const steps = [
		{
			content: (
				<Form.Item
					name="email"
					label="가입할 때 입력한 이메일"
					rules={[
						{
							required: true,
							type: "email",
							message: "올바른 이메일 형식을 입력하세요.",
						},
					]}
				>
					<Input />
				</Form.Item>
			),
		},
		{
			content: <div>{findId}</div>,
		},
	];
	return (
		<Modal
			title="아이디 찾기"
			open={isIdFindModalOpen}
			onCancel={onClickClose}
			centered
			footer={[
				current < 1 ? (
					<Button
						htmlType="submit"
						onClick={form.submit}
					>
						다음
					</Button>
				) : (
					<></>
				),
			]}
		>
			<Form
				form={form}
				layout="vertical"
				onFinish={onClickNext}
			>
				{contextHolder}
				{steps[current].content}
			</Form>
		</Modal>
	);
};

export default IdFindModal;
