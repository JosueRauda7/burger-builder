import React from "react";

// Assets
import classes from "./BuildControls.module.css";

// Components
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>${props.price}</strong>
		</p>
		{controls.map((ctrl) => (
			<BuildControl
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				key={ctrl.label}
				label={ctrl.label}
				disabled={props.disabled[ctrl.type]}
			/>
		))}
		<button
			onClick={props.ordered}
			disabled={props.isAuth ? !props.purchasable : false}
			className={classes.OrderButton}
		>
			{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
		</button>
	</div>
);

export default BuildControls;
