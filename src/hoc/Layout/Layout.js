import React, { useState } from "react";
import { connect } from "react-redux";

// Assets
import style from "./Layout.module.css";

// Components
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

// HOC
import Aux from "../Aux";

const Layout = (props) => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const handleSideDrawerOpen = () => {
		setShowSideDrawer(true);
	};

	const handleSideDrawerClosed = () => {
		setShowSideDrawer(false);
	};

	return (
		<Aux>
			<Toolbar isAuth={props.isAuthenticated} opened={handleSideDrawerOpen} />
			<SideDrawer
				isAuth={props.isAuthenticated}
				open={showSideDrawer}
				closed={handleSideDrawerClosed}
			/>
			<main className={style.Content}>{props.children}</main>
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
