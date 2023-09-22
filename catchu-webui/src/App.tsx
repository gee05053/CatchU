import React, { useState, createContext, useMemo } from "react";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import RecruitPage from "./Pages/RecruitPage";
import CareerPage from "./Pages/CareerPage";
import ResumePage from "./Pages/ResumePage";
import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";

export const LoginContext = createContext({
	setIsLogin: (value: boolean) => {},
	isLogin: false,
});

export const MenuContext = createContext({
	setMenuOpen: (value: boolean) => {},
	isMenuOpen: false,
});

const App: React.FC = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const loginValue = useMemo(
		() => ({ setIsLogin, isLogin }),
		[setIsLogin, isLogin],
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
					<Route>
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
					</Route>
				</Routes>
			</MenuContext.Provider>
		</LoginContext.Provider>
	);
};

export default App;
