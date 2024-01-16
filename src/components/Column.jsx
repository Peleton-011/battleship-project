import React from "react";
import Cell from "./Cell";

const Column = ({ col: i, len, content, onclick }) => {
	return (
		<div className="column">
			{content.map((val, j) => {
				return (
					<Cell
						key={j}
						col={i}
						row={j}
						content={val}
						onclick={onclick}
					/>
				);
			})}
		</div>
	);
};

export default Column;
