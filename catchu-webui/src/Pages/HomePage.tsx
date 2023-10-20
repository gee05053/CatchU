import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import Sider from "../Components/Sider";
import RecruitCompanyPage from "./RecruitCompanyPage";
import { MenuContext } from "../App";

const HomePage: React.FC = () => {
	const isSmallScreen: boolean = useMediaQuery({
		query: "(max-width: 990px)",
	});
	const { isMenuOpen } = useContext(MenuContext);

	return (
		<>{isSmallScreen && isMenuOpen ? <Sider /> : <RecruitCompanyPage />}</>
	);
};

export default HomePage;
