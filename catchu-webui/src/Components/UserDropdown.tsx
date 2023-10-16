import React, { useContext } from "react";
import { Dropdown, MenuProps } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	MailOutlined,
	FileTextOutlined,
} from "@ant-design/icons";
import { LoginContext } from "../App";

const UserDropdown: React.FC = () => {
	const { userData } = useContext(LoginContext);
	console.log(userData);
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
		},
	];
	return (
		<Dropdown
			menu={{ items }}
			trigger={["click"]}
			placement="bottomRight"
		>
			<UserOutlined style={{ fontSize: "25px" }} />
		</Dropdown>
	);
};

export default UserDropdown;
