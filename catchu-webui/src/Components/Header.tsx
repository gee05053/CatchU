import React, { useState } from "react";
import { Layout, Row, Col, Space, Dropdown, MenuProps } from "antd";
import {
	BellOutlined,
	BulbOutlined,
	UserOutlined,
	MenuOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const Header: React.FC = () => {
	const { Header } = Layout;
	const isFullScreen: boolean = useMediaQuery({
		query: "(min-width: 990px)",
	});

	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const onClickMenu = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const items: MenuProps["items"] = [
		{
			key: "0",
			label: "채용",
			style: { fontSize: "20px" },
		},
		{
			key: "1",
			label: "이력서",
		},
		{
			key: "2",
			label: "커리어",
		},
	];
	return (
		<>
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
					{isFullScreen ? (
						<>
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
						</>
					) : (
						<>
							<Col>
								<Space
									size="large"
									style={{ fontSize: "20px" }}
								>
									<BellOutlined />
									<BulbOutlined />
									<Dropdown
										trigger={["click"]}
										menu={{ items }}
										placement="bottomRight"
									>
										<MenuOutlined onClick={onClickMenu} />
									</Dropdown>
								</Space>
							</Col>
						</>
					)}
				</Row>
			</Header>
		</>
	);
};

//todo: change dropdown to sider

export default Header;
