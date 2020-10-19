import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Components
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
	const checkoutCancelled = () => {
		props.history.goBack();
	};

	const checkoutContinued = () => {
		props.history.replace("/checkout/contact-data");
	};

	let summary = <Redirect to='/' />;
	if (props.ings) {
		summary = (
			<div>
				<CheckoutSummary
					checkoutCancelled={checkoutCancelled}
					checkoutContinued={checkoutContinued}
					ingredients={props.ings}
					price={props.price}
				/>
				<Route
					path={props.match.path + "/contact-data"}
					component={ContactData}
				/>
			</div>
		);
	}
	if (props.purchased) {
		summary = <Redirect to='/' />;
	}
	return summary;
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);
