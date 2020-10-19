import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { updatedObject, checkValidity } from "../../shared/utility";

import classes from "./Auth.module.css";

const Auth = (props) => {
	const [controls, setControls] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Mail Address",
			},
			value: "",
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "Password",
			},
			value: "",
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	});

	const [isSignup, setIsSignup] = useState(true);

	const { buildingBurger, authRedirect, onSetRedirectPath } = props;

	useEffect(() => {
		if (!buildingBurger && authRedirect !== "/") {
			onSetRedirectPath();
		}
	}, [buildingBurger, authRedirect, onSetRedirectPath]);

	const handleChangedInput = (event, controlName) => {
		const updatedControls = updatedObject(controls, {
			[controlName]: {
				...controls[controlName],
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					controls[controlName].validation
				),
				touched: true,
			},
		});

		setControls(updatedControls);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onAuth(controls.email.value, controls.password.value, isSignup);
	};

	const handleSwitchAuthMode = () => {
		setIsSignup(!isSignup);
	};

	const formElementsArray = [];
	for (let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key],
		});
	}

	let form = formElementsArray.map((formElement) => (
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
	));

	if (props.loading) {
		form = <Spinner />;
	}

	let errorMessage = null;

	if (props.error) {
		errorMessage = <p>{props.error.message}</p>;
	}

	let authRedirected = null;

	if (props.isAuthenticated) {
		authRedirected = <Redirect to={props.authRedirect} />;
	}

	return (
		<div className={classes.Auth}>
			{authRedirected}
			{errorMessage}
			<form onSubmit={handleSubmit}>
				{form}
				<Button btnType='Success'>SUBMIT</Button>
			</form>
			<Button clicked={handleSwitchAuthMode} btnType='Danger'>
				SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirect: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
