import React from "react";

const CheckBox = ({ className, label, ...rest }) => {
	return (
		<label className={className}>
			<input type="checkbox" {...rest} /> <span>{label}</span>
		</label>
	);
};

export default CheckBox;
