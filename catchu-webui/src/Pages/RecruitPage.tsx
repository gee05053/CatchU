import React, { useState } from "react";
import {
	Form,
	Input,
	message,
	Row,
	Col,
	Button,
	DatePicker,
	Upload,
	Modal,
	Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/es/upload";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import axios from "axios";

const RecruitPage: React.FC = () => {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState<UploadFile[]>();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	let images = [];
	const getBase64 = (file: RcFile): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	const onHandlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
		);
	};
	const onClickImageUpload: UploadProps["onChange"] = ({
		fileList: newFileList,
	}) => {
		setFileList(newFileList);
	};
	return (
		<Row
			justify="center"
			align="middle"
			style={{ height: "100vh" }}
		>
			<Col span={8}>
				<Form
					form={form}
					layout="vertical"
					style={{ marginTop: "100px" }}
				>
					<Form.Item
						name="employment_title"
						label="제목"
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="company_name"
						label="회사 이름"
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="location"
						label="회사 지역"
					>
						<Select
							options={[
								{ value: "서울", label: "서울" },
								{ value: "인천", label: "인천" },
								{ value: "부산", label: "부산" },
								{ value: "대전", label: "대전" },
								{ value: "광주", label: "광주" },
								{ value: "대구", label: "대구" },
								{ value: "울산", label: "울산" },
								{ value: "세종", label: "세종" },
								{ value: "경기", label: "경기" },
								{ value: "강원", label: "강원" },
								{ value: "충북", label: "충북" },
								{ value: "충남", label: "충남" },
								{ value: "전북", label: "전북" },
								{ value: "전남", label: "전남" },
								{ value: "경북", label: "경북" },
							]}
						/>
					</Form.Item>
					<Form.Item
						name="description"
						label="회사 설명"
					>
						<Input.TextArea rows={10} />
					</Form.Item>
					<Form.Item
						name="images"
						label="회사 사진들"
					>
						<Upload
							action="/companies/recruit"
							listType="picture-card"
							fileList={fileList}
							onPreview={onHandlePreview}
							onChange={onClickImageUpload}
						>
							<div>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>Upload</div>
							</div>
						</Upload>
						<Modal
							open={previewOpen}
							title={previewTitle}
							footer={null}
							onCancel={() => setPreviewOpen(false)}
						>
							<img
								alt="example"
								style={{ width: "100%" }}
								src={previewImage}
							/>
						</Modal>
					</Form.Item>
					<Form.Item
						name="end_data"
						label="모집 마감 기한"
					>
						<DatePicker />
					</Form.Item>
					{/*
					<Form.Item
						name="keywords"
						label="키워드"
					>
					</Form.Item>
					*/}
					<Button htmlType="submit">등록하기</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default RecruitPage;
