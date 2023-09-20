import React, { useState } from "react";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import RecruitPage from "./Pages/RecruitPage";
import CareerPage from "./Pages/CareerPage";
import ResumePage from "./Pages/ResumePage";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<Header
				isMenuOpen={isMenuOpen}
				setMenuOpen={setMenuOpen}
			/>
			<Routes>
				<Route>
					<Route
						index
						element={<HomePage isMenuOpen={isMenuOpen} />}
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
				</Route>
			</Routes>
		</>
	);
};

export default App;
