import React from "react";

const Cell = ({ col, row, content, onclick }) => {
	return (
		<div className="cell" onClick={(e) => onclick(e, [col, row])}>
			{content}
		</div>
	);
};

export default Cell;
