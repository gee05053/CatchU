import React from "react";
import { Layout } from "antd";

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
			<div>test</div>
		</Content>
	);
};

export default Content;
