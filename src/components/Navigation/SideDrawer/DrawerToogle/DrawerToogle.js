import React from "react";

// Assets
import classes from "./DrawerToogle.module.css";

const DrawerToogle = (props) => {
	return (
		<div className={classes.DrawerToggle} onClick={props.clicked}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default DrawerToogle;
