import React from "react";
import CheckBox from "./CheckBox";
import classes from "../styles/Answers.module.css";

const Answers = () => {
	return (
		<div className={classes.answers}>
			<CheckBox className={classes.answer} label="A New Hope 1" />
		</div>
	);
};

export default Answers;
