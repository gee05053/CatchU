import React from "react";
import { Layout, Menu, MenuProps } from "antd";

const Sider: React.FC = () => {
	const items: MenuProps["items"] = [
		{
			key: "0",
			label: "채용",
			style: {
				textAlign: "center",
				fontSize: "20px",
			},
		},
		{
			key: "1",
			label: "이력서",
			style: {
				textAlign: "center",
				fontSize: "20px",
			},
		},
		{
			key: "2",
			label: "커리어",
			style: {
				textAlign: "center",
				fontSize: "20px",
			},
		},
	];
	const { Sider } = Layout;
	return (
		<Sider width={"100%"}>
			<Menu items={items} />
		</Sider>
	);
};

export default Sider;
