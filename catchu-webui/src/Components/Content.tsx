import React from "react";
import { Layout } from "antd";
import RecommandCompany from "./RecommandCompany";
import axios from "axios";

const Content: React.FC = () => {
	const { Content } = Layout;
	const data = async () => {
		axios.get("/user").then((res) => console.log(res.data));
	};
	data();
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
