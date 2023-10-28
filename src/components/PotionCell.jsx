import React from "react";

const PotionCell = ({ row, col, onblur }) => {
	const parents = [col + 1, col + row + 2];
	return (
		<div
			className="potion-cell"
			onBlur={(e) => onblur(e, parents[0], parents[1])}
			contentEditable="true"
			onKeyDown={(e) => {
				if (e.code === "Enter") {
					e.target.blur();
				}
			}}
		></div>
	);
};

export default PotionCell;
