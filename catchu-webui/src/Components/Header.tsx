import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Layout, Row, Col, Space, Button, message } from "antd";
import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoginContext, MenuContext } from "../App";
import UserDropdown from "./UserDropdown";

const Header: React.FC = () => {
	const { Header } = Layout;
	const { setMenuOpen, isMenuOpen } = useContext(MenuContext);
	const { isLogin, userData } = useContext(LoginContext);
	const [messageApi, contextHolder] = message.useMessage();
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
			{contextHolder}
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
								span={24}
								style={{ fontSize: "18px" }}
							>
								<Link
									to="/recruit"
									style={{ color: "#1f1f1f" }}
									onClick={(e) => {
										if (isLogin) {
											if (userData.position !== "Company") {
												messageApi.open({
													type: "error",
													content: "기업만 이용할 수 있는 메뉴입니다..",
												});
												e.preventDefault();
											}
										} else {
											messageApi.open({
												type: "error",
												content: "로그인 후에 이용해 주시길 바랍니다.",
											});
											e.preventDefault();
										}
									}}
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
