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
				paddingInline: "12%",
			}}
		>
			<Row
				justify="space-between"
				align="middle"
			>
				<Col>
					<b style={{ fontSize: "22px" }}>CatchU</b>
				</Col>
				<Col
					span={8}
					style={{
						display: "flex",
						justifyContent: "space-between",
						fontSize: "18px",
						textAlign: "center",
					}}
				>
					<Col
						span={8}
						style={{ fontSize: "18px" }}
					>
						채용
					</Col>
					<Col
						span={8}
						style={{ fontSize: "18px" }}
					>
						이력서
					</Col>
					<Col
						span={8}
						style={{ fontSize: "18px" }}
					>
						커리어
					</Col>
				</Col>
				<Col>
					<Space
						size="large"
						style={{ fontSize: "20px" }}
					>
						<BellOutlined />
						<BulbOutlined />
						<UserOutlined />
					</Space>
				</Col>
			</Row>
		</Header>
	);
};

export default Header;
