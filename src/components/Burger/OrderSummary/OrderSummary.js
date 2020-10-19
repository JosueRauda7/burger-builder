import React from "react";

// Components
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: "capitalize" }}>{igKey}:</span>{" "}
				{props.ingredients[igKey]}
			</li>
		);
	}); //<li>Salad: 1</li>

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total Price:</strong> ${props.price}
			</p>
			<p>Continue to Checkout?</p>
			<Button clicked={props.purchaseCanceled} btnType='Danger'>
				CANCEL
			</Button>
			<Button clicked={props.purchaseContinue} btnType='Success'>
				CONTINUE
			</Button>
		</Aux>
	);
};

export default OrderSummary;
