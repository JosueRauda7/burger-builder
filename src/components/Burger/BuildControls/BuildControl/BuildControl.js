import React from "react";
// Assets
import classes from "./BuildControl.module.css";

const BuildControl = (props) => (
	<div className={classes.BuildControl}>
		<div className={classes.Label}>{props.label}</div>
		<button
			onClick={props.removed}
			disabled={props.disabled}
			className={classes.Less}
		>
			Less
		</button>
		<button onClick={props.added} className={classes.More}>
			More
		</button>
	</div>
);

export default BuildControl;
