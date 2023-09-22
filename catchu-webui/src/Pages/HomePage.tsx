import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Layout } from "antd";
import Sider from "../Components/Sider";
import Content from "../Components/Content";
import { MenuContext } from "../App";

const HomePage: React.FC = () => {
	const isSmallScreen: boolean = useMediaQuery({
		query: "(max-width: 990px)",
	});
	const { isMenuOpen } = useContext(MenuContext);

	return (
		<Layout style={{ backgroundColor: "#ffffff" }}>
			<Layout style={{ backgroundColor: "#ffffff" }}>
				{isSmallScreen && isMenuOpen ? <Sider /> : <Content />}
			</Layout>
		</Layout>
	);
};

export default HomePage;
