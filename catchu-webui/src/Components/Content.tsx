import React from "react";
import { Layout } from "antd";
import RecommandCompany from "./RecommandCompany";

const Content: React.FC = () => {
	const { Content } = Layout;
	return (
		<Content
			style={{
				maxWidth: "1060px",
				margin: "0 auto",
				paddingTop: "40px",
				paddingBottom: "144px",
			}}
		>
			<RecommandCompany />
		</Content>
	);
};

export default Content;
