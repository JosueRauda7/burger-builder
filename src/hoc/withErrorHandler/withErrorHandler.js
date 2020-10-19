import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const WithErrorHandler = (WrappedComponent, axios) => {
	const ErrorWrapper = (props) => {
		const [error, clearError] = useHttpErrorHandler(axios);

		return (
			<Aux>
				<Modal show={error} modalClosed={clearError}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Aux>
		);
	};

	return ErrorWrapper;
};

export default WithErrorHandler;
