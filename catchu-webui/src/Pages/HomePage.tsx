import React from "react";
import { useMediaQuery } from "react-responsive";
import { Layout } from "antd";
import Sider from "../Components/Sider";
import Content from "../Components/Content";

type props = {
	isMenuOpen: boolean;
};
const HomePage: React.FC<props> = ({ isMenuOpen }) => {
	const isSmallScreen: boolean = useMediaQuery({
		query: "(max-width: 990px)",
	});

	return (
		<Layout style={{ backgroundColor: "#ffffff" }}>
			<Layout style={{ backgroundColor: "#ffffff" }}>
				{isSmallScreen && isMenuOpen ? <Sider /> : <Content />}
			</Layout>
		</Layout>
	);
};

export default HomePage;
