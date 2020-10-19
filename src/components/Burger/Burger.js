import React from "react";

// Assets
import classes from "./Burger.module.css";

// Components
import BurgerIngredient from "./BurgerIngredient/BurgerIngrediente";

const Burger = (props) => {
	let transformIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey.toString()} />;
			});
		})
		.reduce((arr, el) => arr.concat(el), []);

	if (transformIngredients.length === 0) {
		transformIngredients = (
			<p className={classes.boldLetter}>
				Por favor, empieza a agregar ingredientes.
			</p>
		);
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{transformIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
};

export default Burger;
