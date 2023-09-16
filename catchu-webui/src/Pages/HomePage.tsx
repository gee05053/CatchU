import React from "react";
import { Layout } from "antd";
import Header from "../Components/Header";
import Content from "../Components/Content";

const HomePage: React.FC = () => {
	return (
		<Layout style={{ backgroundColor: "#ffffff" }}>
			<Header />
      <Content />
		</Layout>
	);
};

export default HomePage;
