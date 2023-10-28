import React from "react";
import Cell from "./Cell";

const Column = ({ col: i, len, contents }) => {
	return (
		<div
			key={i === 0 ? "alchemicals" : i === len + 1 ? "pad" : (i + 9).toString(36).toUpperCase()}
			className="column"
		>
			{(() => {
				const cells = [];
				for (let j = 0; j < len + 1; j++) {
					cells.push(
						<Cell key = {j} col={i} row={j} content={j === 0 && i !== 0 ? (i + 9).toString(36).toUpperCase() : contents[j - 1]} />
					);
				}
                return cells;
			})()}
		</div>
	);
};

export default Column;
