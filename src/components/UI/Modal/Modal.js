import React from "react";

// Assets
import classes from "./Modal.module.css";

// Components
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
	// Mejorar el rendimiento con shouldComponentUpdate
	// Para no renderizar el modal cuando no se esté viendo
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return (
	// 		nextProps.show !== this.props.show ||
	// 		nextProps.children !== this.props.children
	// 	);
	// }

	//WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
	// componentWillUpdate(nextProps, nextState) {
	// 	// Con esto se ve que al ser un wrap up component
	// 	// lo que esté dentro de él no se renderizará si este componente no se renderiza
	// 	console.log("Modal will update");
	// }

	return (
		<Aux>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
				style={{
					transform: props.show ? "translateY(0)" : "translateY(-100vh)",
					opacity: props.show ? "1" : "0",
				}}
				className={classes.Modal}
			>
				{props.children}
			</div>
		</Aux>
	);
};

export default React.memo(
	Modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
);
