import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Layout, Row, Col, Space, Button } from "antd";
import {
	BellOutlined,
	UserOutlined,
	MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoginContext, MenuContext } from "../App";

const Header: React.FC = () => {
	const { Header } = Layout;
	const { setMenuOpen, isMenuOpen } = useContext(MenuContext);
	const { isLogin } = useContext(LoginContext);

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
				position: "fixed",
				width: "100%",
			}}
		>
			<Row
				justify="space-between"
				align="middle"
			>
				<Col>
					<Link
						to="/"
						style={{ color: "#1f1f1f" }}
					>
						<b style={{ fontSize: "22px" }}>CatchU</b>
					</Link>
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
								<Link
									to="/recruit"
									style={{ color: "#1f1f1f" }}
								>
									채용
								</Link>
							</Col>
							<Col
								span={8}
								style={{ fontSize: "18px" }}
							>
								<Link
									to="/resume"
									style={{ color: "#1f1f1f" }}
								>
									이력서
								</Link>
							</Col>
							<Col
								span={8}
								style={{ fontSize: "18px" }}
							>
								<Link
									to="/Career"
									style={{ color: "#1f1f1f" }}
								>
									커리어
								</Link>
							</Col>
						</Col>
						{isLogin ? (
							<Col>
								<Space
									size="large"
									style={{ fontSize: "20px" }}
								>
									<BellOutlined />
									<UserOutlined />
								</Space>
							</Col>
						) : (
							<Col>
								<Link to="/login">
									<Button>로그인</Button>
								</Link>
							</Col>
						)}
					</>
				) : isLogin ? (
					<Col>
						<Space
							size="large"
							style={{ fontSize: "20px" }}
						>
							<BellOutlined />
							<MenuOutlined onClick={onClickMenu} />
						</Space>
					</Col>
				) : (
					<Col>
						<Link to="/login">
							<Button>로그인</Button>
						</Link>
					</Col>
				)}
			</Row>
		</Header>
	);
};

//todo: change dropdown to sider

export default Header;
