import React from "react";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

const Sider: React.FC = () => {
	const items: MenuProps["items"] = [
		{
			key: "0",
			label: (
				<Link
					to="/recruit"
					style={{ color: "#1f1f1f" }}
				>
					채용 공고 올리기
				</Link>
			),
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
