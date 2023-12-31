import React, { useState, createContext, useMemo, useEffect } from "react";
import { Layout } from "antd";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import RecruitUploadPage from "./Pages/RecruitUploadPage";
import LoginPage from "./Pages/LoginPage";
import CompanyDetail from "./Pages/CompanyDetailPage";
import { Route, Routes } from "react-router-dom";

type userDataType = {
	id: number;
	user_id: string;
	password: string;
	email: string;
	user_name: string;
	position: string;
};

export const LoginContext = createContext({
	setIsLogin: (value: boolean) => {},
	isLogin: false,
	setUserData: (value: userDataType) => {},
	userData: JSON.parse(`{}`),
});

export const MenuContext = createContext({
	setMenuOpen: (value: boolean) => {},
	isMenuOpen: false,
});

const App: React.FC = () => {
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [userData, setUserData] = useState<userDataType>();
	useEffect(() => {
		const sessionUserData: string | null =
			window.sessionStorage.getItem("userData");
		if (sessionUserData) {
			const jsonUserData: userDataType = JSON.parse(sessionUserData);
			setIsLogin(true);
			setUserData(jsonUserData);
		}
	}, []);
	const loginValue = useMemo(
		() => ({ setIsLogin, isLogin, setUserData, userData }),
		[setIsLogin, isLogin, setUserData, userData],
	);
	const MenuValue = useMemo(
		() => ({ setMenuOpen, isMenuOpen }),
		[setMenuOpen, isMenuOpen],
	);
	return (
		<LoginContext.Provider value={loginValue}>
			<MenuContext.Provider value={MenuValue}>
				<Layout style={{ backgroundColor: "#ffffff" }}>
					<Header />
					<Routes>
						<Route
							index
							element={<HomePage />}
						/>
						<Route
							path="/recruit"
							element={<RecruitUploadPage />}
						/>
						<Route
							path="/login"
							element={<LoginPage />}
						/>
						<Route
							path="/company/:id"
							element={<CompanyDetail />}
						/>
					</Routes>
				</Layout>
			</MenuContext.Provider>
		</LoginContext.Provider>
	);
};

export default App;
