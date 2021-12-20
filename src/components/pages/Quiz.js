import { useState, useEffect, useReducer } from "react";
import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import { useParams, useNavigate } from "react-router-dom";
import useQuestions from "../../hooks/useQuestions";
import _ from "lodash";
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";

const initialState = null;
const reducer = (state, action) => {
	switch (action.type) {
		case "questions":
			action.value.forEach((question) => {
				question.options.forEach((option) => {
					option.checked = false;
				});
			});
			return action.value;
		case "answer":
			const questions = _.cloneDeep(state);
			questions[action.questionId].options[action.optionId].checked =
				action.value;
			return questions;
		default:
			return state;
	}
};

const Quiz = () => {
	const { id } = useParams();
	const { loading, error, questions } = useQuestions(id);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [qna, dispatch] = useReducer(reducer, initialState);
	const { currentuser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch({
			type: "questions",
			value: questions,
		});
	}, [questions]);

	function handleAnswerChange(e, index) {
		dispatch({
			type: "answer",
			questionId: currentQuestion,
			optionId: index,
			value: e.target.checked,
		});
	}

	// handle next question button click
	function nextQuestions() {
		if (currentQuestion + 1 < questions.length) {
			setCurrentQuestion((prevCurrent) => prevCurrent + 1);
		}
	}

	// handle previous question button click
	function prevQuestions() {
		if (currentQuestion >= 1 && currentQuestion <= questions.length) {
			setCurrentQuestion((prevCurrent) => prevCurrent - 1);
		}
	}

	// submit results in results db node
	async function submit() {
		const { uid } = currentuser;
		const db = getDatabase();
		const resultRef = ref(db, `result/${uid}`);
		await set(resultRef, {
			[id]: qna,
		});
		navigate(`/result/${id}`, {
			state: {
				qna,
			},
		});
	}

	// calculate progress percentage
	const percentage =
		questions.length > 0
			? ((currentQuestion + 1) / questions.length) * 100
			: 0;

	return (
		<>
			{loading && <div>Loading ...</div>}
			{error && <div>Something went wrong!</div>}
			{!loading && !error && qna && qna.length > 0 && (
				<>
					<h1>{qna[currentQuestion].title}</h1>
					<h4>Question can have multiple answers</h4>
					<Answers
						input
						options={qna[currentQuestion].options}
						handleChange={handleAnswerChange}
					/>
					<ProgressBar
						next={nextQuestions}
						prev={prevQuestions}
						progress={percentage}
						submit={submit}
					/>
					<MiniPlayer />
				</>
			)}
		</>
	);
};

export default Quiz;
