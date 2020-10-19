import * as actionTypes from "../actions/actions";
import { updatedObject } from "../../shared/utility";

const initialState = {
	ingredients: null,
	totalPrice: 1.5,
	error: false,
	building: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

const addIngredient = (state, action) => {
	const updatedIngredient = {
		...state.ingredients,
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	};
	const updatedIngredients = updatedObject(
		state.ingredients,
		updatedIngredient
	);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: +(
			state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
		).toFixed(3),
		building: true,
	};
	return updatedObject(state, updatedState);
};

const rmIngredient = (state, action) => {
	const updatedIn = {
		...state.ingredients,
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
	};
	const updatedIngs = updatedObject(state.ingredients, updatedIn);
	const updatedSt = {
		ingredients: updatedIngs,
		totalPrice: +(
			state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
		).toFixed(3),
		building: true,
	};
	return updatedObject(state, updatedSt);
};

const setIngredients = (state, action) => {
	return updatedObject(state, {
		...state,
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		totalPrice: initialState.totalPrice,
		error: false,
		building: false,
	});
};

const fetchIngredientsFailed = (state, action) => {
	return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return rmIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
