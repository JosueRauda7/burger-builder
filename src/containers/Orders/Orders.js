import React, { Fragment, useEffect } from "react";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

// Components
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
	const { onFetchOrders, token, userId } = props;

	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = props.orders.map((order) => (
			<Order
				ingredients={order.ingredients}
				key={order.id}
				price={order.price}
			/>
		));
	}
	return <Fragment>{orders}</Fragment>;
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
