import React from "react";

const Cell = ({ col, row, content, onclick }) => {
	if (col === 0 && row !== 0)
		return <div className="cell number-cell">{row}</div>;
	return (
		<div className="cell" onClick={(e) => onclick(e, [col, row])}>
			{content}
		</div>
	);
};

export default Cell;
