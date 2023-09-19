import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Layout } from "antd";
import Header from "../Components/Header";
import Sider from "../Components/Sider";
import Content from "../Components/Content";

const HomePage: React.FC = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const isSmallScreen: boolean = useMediaQuery({
		query: "(max-width: 990px)",
	});

	return (
		<Layout style={{ backgroundColor: "#ffffff" }}>
			<Header
				isMenuOpen={isMenuOpen}
				setMenuOpen={setMenuOpen}
			/>
			<Layout style={{ backgroundColor: "#ffffff" }}>
				{isSmallScreen && isMenuOpen ? <Sider /> : <Content />}
			</Layout>
		</Layout>
	);
};

export default HomePage;
