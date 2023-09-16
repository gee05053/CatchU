import React from "react";
import { Layout, Row, Col, Space } from "antd";
import {
	BellOutlined,
	BulbOutlined,
	UserOutlined,
} from "@ant-design/icons";

const Header: React.FC = () => {
	const { Header } = Layout;
	return (
		<Header
			style={{
				backgroundColor: "#ffffff",
				borderBottomWidth: 1,
				borderBottomStyle: "solid",
				borderBottomColor: "#ebebeb",
				paddingInline: "10%",
			}}
		>
			<Row
				style={{
					alignItems: "center",
				}}
			>
				<Col span={4}>
					<b style={{ fontSize: "22px" }}>CatchU</b>
				</Col>
				<Col
					span={3}
					style={{ fontSize: "18px" }}
				>
					채용
				</Col>
				<Col span={3}>커리어</Col>
				<Col
					span={11}
					style={{ fontSize: "18px" }}
				>
					이력서
				</Col>
				<Col>
					<Space size="large">
						<BellOutlined style={{ fontSize: "20px" }} />
						<BulbOutlined style={{ fontSize: "20px" }} />
						<UserOutlined style={{ fontSize: "20px" }} />
					</Space>
				</Col>
			</Row>
		</Header>
	);
};

export default Header;
