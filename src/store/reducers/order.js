import * as actionTypes from "../actions/actions";
import { updatedObject } from "../../shared/utility";

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const purchaseInit = (state) => updatedObject(state, { purchased: false });

const purchaseBurgerStart = (state) => {
	return updatedObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
	const newOrder = {
		...action.orderData,
		id: action.orderId,
	};
	return updatedObject(state, {
		orders: state.orders.concat(newOrder),
		loading: false,
		purchased: true,
	});
};

const fetchOrderStart = (state) => updatedObject(state, { loading: true });

const purchaseBurgerFailed = (state) => {
	return updatedObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
	return updatedObject(state, { orders: action.orders, loading: false });
};

const fetchOrderFailed = (state) => {
	return updatedObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return purchaseInit(state);
		case actionTypes.PURCHASE_BURGER_START:
			return purchaseBurgerStart(state);
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action);
		case actionTypes.PURCHASE_BURGER_FAILED:
			return purchaseBurgerFailed(state);
		case actionTypes.FETCH_ORDERS_START:
			return fetchOrderStart(state);
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fetchOrderSuccess(state, action);
		case actionTypes.FETCH_ORDERS_FAILED:
			return fetchOrderFailed(state);
		default:
			return state;
	}
};

export default reducer;
