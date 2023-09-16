import React from "react";
import { Button, Card, Row, Col } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const RecommandCompany: React.FC = () => {
	return (
		<div style={{ overflow: "hidden" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "20px",
				}}
			>
				<b style={{ fontSize: "18px" }}>추천 포지션</b>
				<div>
					<Button type="text">전체보기</Button>
					<Button>
						<LeftOutlined />
					</Button>
					<Button>
						<RightOutlined />
					</Button>
				</div>
			</div>
			<Row
				gutter={16}
				style={{ width: "5400px" }}
			>
				<Col>
					<Card hoverable>
						<Card.Meta
							title="test company1"
							description="company1"
						/>
					</Card>
				</Col>
				<Col>
					<Card hoverable>
						<Card.Meta
							title="test company2"
							description="company2"
						/>
					</Card>
				</Col>
				<Col>
					<Card hoverable>
						<Card.Meta
							title="test company3"
							description="company3"
						/>
					</Card>
				</Col>
				<Col>
					<Card hoverable>
						<Card.Meta
							title="test company4"
							description="company4"
						/>
					</Card>
				</Col>
				<Col>
					<Card hoverable>
						<Card.Meta
							title="test company5"
							description="company5"
						/>
					</Card>
				</Col>
				<Col>
					<Card hoverable>
						<Card.Meta
							title="test company6"
							description="company6"
						/>
					</Card>
				</Col>
				<Col>
					<Card hoverable>
						<Card.Meta
							title="test company7"
							description="company7"
						/>
					</Card>
				</Col>
			</Row>
		</div>
		//Todo add carousel
	);
};

export default RecommandCompany;
