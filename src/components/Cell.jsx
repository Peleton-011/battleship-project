import React from "react";

const Cell = ({ col, row, content }) => {
	if (col === 0 && row !== 0)
		return (
			<div className="cell matrix">
				<div>
					<div>{content.red.size}</div>
					<div>{content.green.size}</div>
					<div>{content.blue.size}</div>
				</div>
				<div>
					<div>{content.red.sign}</div>
					<div>{content.green.sign}</div>
					<div>{content.blue.sign}</div>
				</div>
			</div>
		);
	return <div className="cell">{content}</div>;
};

export default Cell;
