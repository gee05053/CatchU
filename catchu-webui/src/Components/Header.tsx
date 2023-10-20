import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Layout, Row, Col, Space, Button } from "antd";
import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoginContext, MenuContext } from "../App";
import UserDropdown from "./UserDropdown";

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
				position: "fixed",
				width: "100%",
				zIndex: 1,
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
						<b style={{ fontSize: "25px" }}>CatchU</b>
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
								span={12}
								style={{ fontSize: "18px" }}
							>
								<Link
									to=""
									style={{ color: "#1f1f1f" }}
								>
									채용 공고
								</Link>
							</Col>
							<Col
								span={12}
								style={{ fontSize: "18px" }}
							>
								<Link
									to="/recruit"
									style={{ color: "#1f1f1f" }}
								>
									채용 공고 올리기
								</Link>
							</Col>
						</Col>
						{isLogin ? (
							<Col span={2}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-around",
										alignItems: "center",
										fontSize: "25px",
									}}
								>
									<BellOutlined />
									<UserDropdown />
								</div>
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
							style={{ fontSize: "25px" }}
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
