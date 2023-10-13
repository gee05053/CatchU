import React, { useState, createContext, useMemo, useEffect } from "react";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import RecruitPage from "./Pages/RecruitPage";
import CareerPage from "./Pages/CareerPage";
import ResumePage from "./Pages/ResumePage";
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
	setUserData: (value: userDataType | undefined) => {},
});

export const MenuContext = createContext({
	setMenuOpen: (value: boolean) => {},
	isMenuOpen: false,
});

const App: React.FC = () => {
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [userData, setUserData] = useState<userDataType | undefined>();
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
		() => ({ setIsLogin, isLogin, setUserData }),
		[setIsLogin, isLogin, setUserData],
	);
	const MenuValue = useMemo(
		() => ({ setMenuOpen, isMenuOpen }),
		[setMenuOpen, isMenuOpen],
	);
	return (
		<LoginContext.Provider value={loginValue}>
			<MenuContext.Provider value={MenuValue}>
				<Header />
				<Routes>
					<Route
						index
						element={<HomePage />}
					/>
					<Route
						path="/recruit"
						element={<RecruitPage />}
					/>
					<Route
						path="/career"
						element={<CareerPage />}
					/>
					<Route
						path="/resume"
						element={<ResumePage />}
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
			</MenuContext.Provider>
		</LoginContext.Provider>
	);
};

export default App;
