import React from "react";
import { useMediaQuery } from "react-responsive";
import { Layout, Row, Col, Space } from "antd";
import {
	BellOutlined,
	BulbOutlined,
	UserOutlined,
	MenuOutlined,
} from "@ant-design/icons";

type props = {
	isMenuOpen: boolean;
	setMenuOpen(isOpen: boolean): void;
};
const Header: React.FC<props> = ({ isMenuOpen, setMenuOpen }) => {
	const { Header } = Layout;

	const isFullScreen: boolean = useMediaQuery({
		query: "(min-width: 990px)",
	});

	const onClickMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

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
								<MenuOutlined onClick={onClickMenu} />
							</Space>
						</Col>
					</>
				)}
			</Row>
		</Header>
	);
};

//todo: change dropdown to sider

export default Header;
