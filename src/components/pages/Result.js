import Summary from "../Summary";
import Analysis from "../Analysis";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import _ from "lodash";

const Result = () => {
	const { id } = useParams();
	const { state } = useLocation();
	const { qna } = state;
	const { loading, error, answers } = useAnswers(id);

	function calculate() {
		let score = 0;
		answers.forEach((question, index1) => {
			let correctIndexs = [],
				checkedIndexs = [];
			question.options.forEach((option, index2) => {
				if (option.correct) correctIndexs.push(index2);
				if (qna[index1].options[index2].checked) {
					checkedIndexs.push(index2);
					option.checked = true;
				}
			});
			if (_.isEqual(correctIndexs, checkedIndexs)) {
				score += 5;
			}
		});
		return score;
	}

	const userScore = calculate();

	return (
		<>
			{loading && <div>Loading...</div>}
			{error && <div>Something went wrong!</div>}
			{!loading && !error && answers && answers.length > 0 && (
				<>
					<Summary score={userScore} noq={answers.length} />
					<Analysis answers={answers} />
				</>
			)}
		</>
	);
};

export default Result;
