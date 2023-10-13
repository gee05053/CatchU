import React, { useState } from "react";
import { Modal, message, Input, Form, Button } from "antd";
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
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const onClickFirstStep = async () => {
		setIsLoading(true);
		const inputValue = form.getFieldsValue();
		try {
			const result = await axios.post("/account/findPassword", inputValue);
			if (result.data.checkNumber === undefined) {
				messageApi.open({
					type: "error",
					content: "가입되어 있는 정보가 없습니다.",
				});
				setIsLoading(false);
			} else {
				setIsLoading(false);
				setCheckNumber(result.data.checkNumber);
				setCurrentStep(currentStep + 1);
			}
		} catch {
			messageApi.open({
				type: "error",
				content: "알수 없는 오류가 발생했습니다.",
			});
			setIsLoading(false);
		}
	};
	const onClickSecondStep = () => {
		const typeCheckNumber = form.getFieldValue("checkNumber");
		if (checkNumber === Number(typeCheckNumber)) {
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
		try {
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
		} catch {
			messageApi.open({
				type: "error",
				content: "비밀번호 변경 중 알 수 없는 오류로 실패했습니다.",
			});
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
						rules={[
							{
								required: true,
								message: "이메일을 입력하세요.",
							},
						]}
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
					label="메일로 전송된 인증번호를 입력하세요."
					rules={[
						{
							required: true,
							message: "올바른 인증번호를 입력하세요",
						},
					]}
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
						name="confirmPassword"
						label="비밀번호 확인"
						rules={[
							{
								required: true,
								message: "비밀번호를 입력하세요",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("비밀번호가 일치하지 않습니다."),
									);
								},
							}),
						]}
					>
						<Input type="password" />
					</Form.Item>
				</>
			),
		},
		{
			content: (
				<div>
					비밀번호 변경이 완료되었습니다. 새로운 비밀번호로 로그인하세요.
				</div>
			),
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
						htmlType="submit"
						loading={isLoading}
						onClick={form.submit}
					>
						다음
					</Button>
				) : (
					<></>
				),
			]}
		>
			{contextHolder}
			<Form
				form={form}
				layout="vertical"
				onFinish={() => {
					if (currentStep === 0) {
						onClickFirstStep();
					} else if (currentStep === 1) {
						onClickSecondStep();
					} else {
						onClickThirdStep();
					}
				}}
			>
				{steps[currentStep].content}
			</Form>
		</Modal>
	);
};

export default PasswordFindModal;
