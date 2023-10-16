import React, { useContext } from "react";
import { Dropdown, MenuProps, message } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	MailOutlined,
	FileTextOutlined,
} from "@ant-design/icons";
import { LoginContext } from "../App";
import axios from "axios";

const UserDropdown: React.FC = () => {
	const { setIsLogin, userData } = useContext(LoginContext);
	const [messageApi, contextHolder] = message.useMessage();
	const items: MenuProps["items"] = [
		{
			key: "0",
			label: userData.user_name,
			icon: <UserOutlined style={{ fontSize: "17px" }} />,
			disabled: true,
			style: {
				cursor: "default",
			},
		},
		{
			key: "1",
			label: userData.email,
			icon: <MailOutlined style={{ fontSize: "17px" }} />,
			disabled: true,
			style: {
				cursor: "default",
			},
		},
		{
			key: "2",
			label: "정보 변경",
			icon: <FileTextOutlined style={{ fontSize: "17px" }} />,
		},
		{
			key: "3",
			label: "로그아웃",
			icon: <LogoutOutlined style={{ fontSize: "17px" }} />,
			onClick: async () => {
				try {
					const result = await axios.post("/user/logout");
					if (result.data.success) {
						window.sessionStorage.removeItem("userData");
						setIsLogin(false);
					} else {
						messageApi.open({
							type: "error",
							content: "로그아웃중 알 수 없는 에러가 발생했습니다.",
						});
					}
				} catch {
					messageApi.open({
						type: "error",
						content: "서버에 에러가 발생하여 로그아웃을 할 수 없습니다.",
					});
				}
			},
		},
	];
	return (
		<>
			{contextHolder}
			<Dropdown
				menu={{ items }}
				trigger={["click"]}
				placement="bottomRight"
			>
				<UserOutlined style={{ fontSize: "25px" }} />
			</Dropdown>
		</>
	);
};

export default UserDropdown;
