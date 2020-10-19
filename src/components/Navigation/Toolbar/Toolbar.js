import React from "react";

// Assets
import classes from "./Toolbar.module.css";

// Components
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationsItems";
import DrawerToogle from "../SideDrawer/DrawerToogle/DrawerToogle";

const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToogle clicked={props.opened} />
			<Logo height='80%' />
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth} />
			</nav>
		</header>
	);
};

export default Toolbar;
