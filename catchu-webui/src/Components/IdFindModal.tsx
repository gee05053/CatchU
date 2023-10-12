import React, { useState } from "react";
import { Modal, Button, Form, Input, Steps, message } from "antd";
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
	const steps = [
		{
			content: (
				<Form
					form={form}
					layout="vertical"
				>
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
				</Form>
			),
		},
		{
			content: <div>{findId}</div>,
		},
	];
	const onClickNext = async () => {
		const inputValue = form.getFieldsValue();
		if (inputValue.email === undefined || inputValue.email === "") {
			messageApi.open({
				type: "error",
				content: "이메일을 입력하세요.",
			});
		} else {
			const result = await axios.get("/user/findId", {
				params: {
					email: inputValue.email,
				},
			});
			if (result.data.findId !== undefined) {
				setFindId(`가입하신 아이디는 ${result.data.findId} 입니다.`);
			}
			setCurrentValue(current + 1);
		}
	};
	const onClickClose = () => {
		form.setFieldsValue({ email: undefined });
		setFindId("가입하신 아이디가 없습니다.");
		setCurrentValue(0);
		setIdFindModalOpen(false);
	};
	return (
		<Modal
			title="아이디 찾기"
			open={isIdFindModalOpen}
			onCancel={onClickClose}
			centered
			footer={[
				current < 1 ? <Button onClick={onClickNext}>다음</Button> : <></>,
			]}
		>
			{contextHolder}
			<Steps current={current} />
			{steps[current].content}
		</Modal>
	);
};

export default IdFindModal;
