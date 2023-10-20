import React, { useContext } from "react";
import { Layout, Menu, MenuProps, message } from "antd";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";

const Sider: React.FC = () => {
	const { Sider } = Layout;
	const [messageApi, contextHolder] = message.useMessage();
	const { isLogin, userData } = useContext(LoginContext);
	const items: MenuProps["items"] = [
		{
			key: "0",
			label: (
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
			),
			style: {
				textAlign: "center",
				fontSize: "20px",
			},
		},
	];
	return (
		<Sider width={"100%"}>
			{contextHolder}
			<Menu items={items} />
		</Sider>
	);
};

export default Sider;
