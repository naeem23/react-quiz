import { useState, useEffect } from "react";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";

const useQuestions = (videoId) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		async function fetchQuestions() {
			const db = getDatabase();
			const quizRef = ref(db, "quiz/" + videoId + "/questions");
			const quizQuery = query(quizRef, orderByKey());

			try {
				setError(false);
				setLoading(true);
				const sanpshot = await get(quizQuery);
				setLoading(false);
				if (sanpshot.exists()) {
					setQuestions((prevQuestions) => {
						return [
							...prevQuestions,
							...Object.values(sanpshot.val()),
						];
					});
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
				setError(true);
			}
		}

		fetchQuestions();
	}, [videoId]);

	return {
		loading,
		error,
		questions,
	};
};

export default useQuestions;
