import React from "react";

// Components
import Burger from "../../Burger/Burger";
import Button from ".././../UI/Button/Button";

// Assets
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div style={{ width: "100%", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
				<h2>
					<strong>Total Price:</strong> ${props.price}
				</h2>
				<Button btnType='Danger' clicked={props.checkoutCancelled}>
					CANCEL
				</Button>
				<Button btnType='Success' clicked={props.checkoutContinued}>
					CONTINUE
				</Button>
			</div>
		</div>
	);
};

export default CheckoutSummary;
