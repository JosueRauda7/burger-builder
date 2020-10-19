import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
	logoutSaga,
	checkAuthTimeoutSaga,
	authUserSaga,
	authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
import * as actionTypes from "../actions/actions";

// AUTH
export function* watchAuth() {
	// Action type, saga
	yield all([
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
	]);
}

// BURGER BUILDER
export function* watchBurgerBuilder() {
	yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

// ORDERS
export function* watchOrders() {
	yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
	yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
