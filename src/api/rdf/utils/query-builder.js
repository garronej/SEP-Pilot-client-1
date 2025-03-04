import { useEffect, useState } from 'react';

export const usePost = (endpoint) => (query) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const url = `${endpoint}`;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/sparql-results+json',
			},
			body: `query=${encodeURI(query)}`,
		})
			.then((r) => {
				if (!r.ok) throw new Error('Not 2xx response');
				return r.json();
			})
			.then((r) => {
				setData(r);
			})
			.catch((e) => {
				setError(e);
			})
			.then(() => {
				setLoading(false);
			});
	}, []);

	return { data, loading, error };
};
