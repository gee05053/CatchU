import React, { useContext } from "react";
import { Modal, message, Form, Input, Button, Select } from "antd";
import { LoginContext } from "../App";
import axios from "axios";

type UserProfileModalProps = {
	isOpenModal: boolean;
	setIsOpenModal: (value: boolean) => void;
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({
	isOpenModal,
	setIsOpenModal,
}) => {
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const { userData, setUserData } = useContext(LoginContext);
	const onClickSubmit = async () => {
		try {
			let body = form.getFieldsValue();
			body.id = userData.id;
			const result = await axios.put("/account/changeProfile", body);
			if (result.data.success) {
				window.sessionStorage.setItem(
					"userData",
					JSON.stringify(result.data.newUserData),
				);

				form.setFieldsValue({
					password: undefined,
					newPassword: undefined,
					confirmNewPassword: undefined,
				});
				setUserData(result.data.newUserData);
				setIsOpenModal(false);
				messageApi.open({
					type: "success",
					content: "정보변경에 성공했습니다.",
				});
			} else {
				messageApi.open({
					type: "error",
					content: "서버 오류로 인하여 정보 변경에 실패했습니다.",
				});
			}
		} catch {
			messageApi.open({
				type: "error",
				content: "알 수없는 오류 발생으로 정보 변경에 실패했습니다.",
			});
		}
	};
	return (
		<>
			{contextHolder}
			<Modal
				centered
				open={isOpenModal}
				onCancel={() => setIsOpenModal(false)}
				footer={[
					<Button
						htmlType="submit"
						onClick={form.submit}
					>
						제출
					</Button>,
				]}
				title="정보 변경"
			>
				<Form
					form={form}
					layout="vertical"
					style={{ marginTop: "20px" }}
					onFinish={onClickSubmit}
				>
					<Form.Item
						name="userId"
						label="아이디"
						initialValue={userData.user_id}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						name="email"
						label="E-mail"
						initialValue={userData.email}
					>
						<Input disabled />
					</Form.Item>
					<Form.Item
						name="position"
						label="포지션"
						initialValue={userData.position}
					>
						<Select disabled />
					</Form.Item>
					<Form.Item
						name="userName"
						label="이름"
						rules={[
							{ required: true, message: "사용하실 이름을 입력하세요" },
						]}
						initialValue={userData.user_name}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="현재 비밀번호"
						rules={[
							{
								required: true,
								message: "현재 비밀번호를 입력하세요",
							},
							() => ({
								validator(_, value) {
									if (!value || userData.password === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("현재 비밀번호가 일치하지 않습니다."),
									);
								},
							}),
						]}
					>
						<Input type="password" />
					</Form.Item>
					<Form.Item
						name="newPassword"
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
						name="confirmNewPassword"
						label="비밀번호 확인"
						rules={[
							{
								required: true,
								message: "비밀번호를 입력하세요",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("newPassword") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("변경할 비밀번호가 일치하지 않습니다."),
									);
								},
							}),
						]}
					>
						<Input type="password" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default UserProfileModal;
