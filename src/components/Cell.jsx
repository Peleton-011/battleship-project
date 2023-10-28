import React from "react";

const Cell = ({ col, row, content }) => {
	if (col === 0 && row !== 0)
		return (
			<div className="cell matrix">
				{row}
			</div>
		);
	return <div className="cell">{content}</div>;
};

export default Cell;
