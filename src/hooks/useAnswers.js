import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (videoId) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		async function fetchAnswers() {
			const db = getDatabase();
			const answerRef = ref(db, "answers/" + videoId + "/questions");
			const answerQuery = query(answerRef, orderByKey());

			try {
				setLoading(true);
				setError(false);
				const snapshot = await get(answerQuery);
				setLoading(false);
				if (snapshot.exists()) {
					setAnswers((prevAnswers) => {
						return [
							...prevAnswers,
							...Object.values(snapshot.val()),
						];
					});
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
				setError(true);
			}
		}
		fetchAnswers();
	}, [videoId]);

	return {
		loading,
		error,
		answers,
	};
};

export default useAnswers;
