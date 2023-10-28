import React from "react";
import Cell from "./Cell";

const Column = ({ col: i, len, name, contents }) => {
	return (
		<div
			key={i === 0 ? "alchemicals" : i === len + 1 ? "pad" : name}
			className="column"
		>
			{(() => {
				const cells = [];
				for (let j = 0; j < len + 1; j++) {
					cells.push(
						<Cell key = {j} col={i} row={j} content={j === 0 && i !== 0 ? name : contents[j - 1]} />
					);
				}
                return cells;
			})()}
		</div>
	);
};

export default Column;
