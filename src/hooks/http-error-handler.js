import { useState, useEffect } from "react";

export default (httpClient) => {
	const [error, setError] = useState(null);

	const reqInterceptor = httpClient.interceptors.request.use((req) => {
		setError(null);
		return req;
	});
	const resInterceptor = httpClient.interceptors.response.use(
		(res) => res,
		(error) => {
			setError(error);
		}
	);

	//ComponenWillUnmount like useEffect with clean useEffect
	useEffect(() => {
		return () => {
			httpClient.interceptors.request.eject(reqInterceptor);
			httpClient.interceptors.response.eject(resInterceptor);
		};
	}, [reqInterceptor, resInterceptor]);

	const handleErrorConfirmed = () => {
		setError(error);
	};

	return [error, handleErrorConfirmed];
};
