import React, { useState } from "react";
import { Modal, Steps, message, Input, Form, Button } from "antd";
import axios from "axios";

type PasswordFindModalProps = {
	isPasswordFindModalOpen: boolean;
	setPasswordFindModalOpen: (value: boolean) => void;
};
const PasswordFindModal: React.FC<PasswordFindModalProps> = ({
	isPasswordFindModalOpen,
	setPasswordFindModalOpen,
}) => {
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [checkNumber, setCheckNumber] = useState<number>();
	const onClickFirstStep = async () => {
		const inputValue = form.getFieldsValue();
		if (
			inputValue.id === undefined ||
			inputValue.id === "" ||
			inputValue.email === undefined ||
			inputValue.email === ""
		) {
			messageApi.open({
				type: "error",
				content: "가입한 아이디와 이메일을 입력하세요.",
			});
		} else {
			const result = await axios.post("/account/findPassword", inputValue);
			if (result.data.checkNumber === undefined) {
				messageApi.open({
					type: "error",
					content: "가입되어 있는 정보가 없습니다.",
				});
			} else {
				setCheckNumber(result.data.checkNumber);
				setCurrentStep(currentStep + 1);
			}
		}
	};
	const onClickSecondStep = () => {
		const typeCheckNumber = form.getFieldValue("checkNumber");
		if (checkNumber == typeCheckNumber) {
			setCurrentStep(currentStep + 1);
		} else {
			messageApi.open({
				type: "error",
				content: "인증번호가 올바르지 않습니다.",
			});
		}
	};
	const onClickThirdStep = async () => {
		const inputValue = form.getFieldsValue();
		if (
			inputValue.password === undefined ||
			inputValue.password === "" ||
			inputValue.confirmPassword === undefined ||
			inputValue === ""
		) {
			messageApi.open({
				type: "error",
				content: "비밀번호를 입력하세요",
			});
		} else {
			const result = await axios.post(
				"/account/changePassword",
				inputValue,
			);
			if (result.data.success) {
				setCurrentStep(currentStep + 1);
			} else {
				messageApi.open({
					type: "error",
					content: "비밀번호 변경에 실패했습니다.",
				});
			}
		}
	};
	const onClickClose = () => {
		form.setFieldsValue({
			id: undefined,
			email: undefined,
			checkNumber: undefined,
			password: undefined,
			confirmPassword: undefined,
		});
		setCurrentStep(0);
		setPasswordFindModalOpen(false);
	};
	const steps = [
		{
			content: (
				<>
					<Form.Item
						name="id"
						label="아이디"
						required={true}
						style={{ marginTop: "10px" }}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="email"
						label="이메일"
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
				</>
			),
		},
		{
			content: (
				<Form.Item
					name="checkNumber"
					label="인증번호"
				>
					<Input />
				</Form.Item>
			),
		},
		{
			content: (
				<>
					<Form.Item
						name="password"
						label="변경할 비밀번호"
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						label="비밀번호 확인"
					>
						<Input />
					</Form.Item>
				</>
			),
		},
		{
			content: <div>비밀번호 변경이 완료되었습니다.</div>,
		},
	];
	return (
		<Modal
			centered
			open={isPasswordFindModalOpen}
			title="비밀번호 찾기"
			onCancel={onClickClose}
			footer={[
				currentStep < 3 ? (
					<Button
						onClick={() => {
							if (currentStep === 0) {
								onClickFirstStep();
							} else if (currentStep === 1) {
								onClickSecondStep();
							} else {
								onClickThirdStep();
							}
						}}
					>
						다음
					</Button>
				) : (
					<></>
				),
			]}
		>
			{contextHolder}
			<Steps current={currentStep} />
			<Form
				form={form}
				layout="vertical"
			>
				{steps[currentStep].content}
			</Form>
		</Modal>
	);
};

export default PasswordFindModal;
