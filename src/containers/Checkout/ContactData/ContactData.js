import React, { useState } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { updatedObject, checkValidity } from "../../../shared/utility";

// Components
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

// Assets
import classes from "./ContactData.module.css";

const ContactData = (props) => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your name",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "ZIP Code",
			},
			value: "",
			validation: {
				required: true,
				minLength: 4,
				maxLegth: 5,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Country",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Your E-Mail",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		deliveryMethod: {
			elementType: "select",
			elementConfig: {
				options: [
					{ value: "fastest", displayValue: "Fastest" },
					{ value: "cheapest", displayValue: "Cheapest" },
				],
			},
			validation: {},
			value: "fastest",
			valid: true,
		},
	});

	const [formIsValid, setFormIsValid] = useState(false);

	const handleOrder = (event) => {
		event.preventDefault();

		const formData = {};
		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId,
		};

		props.onOrderBurger(order, props.token);
	};

	const handleChangedInput = (event, inputIdentifier) => {
		// const updatedOrderForm = { ...this.state.orderForm };
		const updateFormElement = updatedObject(orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(
				orderForm[inputIdentifier].value,
				orderForm[inputIdentifier].validation
			),
			touched: true,
		});
		const updatedOrderForm = updatedObject(orderForm, {
			[inputIdentifier]: updateFormElement,
		});

		let formValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formValid = updatedOrderForm[inputIdentifier].valid && formValid;
		}

		setOrderForm(updatedOrderForm);
		setFormIsValid(formValid);
		// console.log(event.target.value);
	};

	const formElementsArray = [];
	for (let key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key],
		});
	}

	let form = (
		<form onSubmit={handleOrder}>
			{formElementsArray.map((formElement) => {
				return (
					<Input
						key={formElement.id}
						changed={(event) => handleChangedInput(event, formElement.id)}
						elementConfig={formElement.config.elementConfig}
						inputType={formElement.config.elementType}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						value={formElement.config.value}
					/>
				);
			})}
			<Button btnType='Success' disabled={!formIsValid}>
				ORDER
			</Button>
		</form>
	);
	if (props.loading) {
		form = <Spinner />;
	}
	return (
		<div className={classes.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
