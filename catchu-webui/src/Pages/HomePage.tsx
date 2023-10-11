import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Layout } from "antd";
import Sider from "../Components/Sider";
import RecommandCompany from "../Components/RecommandCompany";
import { MenuContext } from "../App";

const HomePage: React.FC = () => {
	const isSmallScreen: boolean = useMediaQuery({
		query: "(max-width: 990px)",
	});
	const { isMenuOpen } = useContext(MenuContext);

	return (
		<Layout style={{ backgroundColor: "#ffffff" }}>
			{isSmallScreen && isMenuOpen ? <Sider /> : <RecommandCompany />}
		</Layout>
	);
};

export default HomePage;
