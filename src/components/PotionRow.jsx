import React from "react";
import PotionCell from "./PotionCell";

const PotionRow = ({ row, len, onblur }) => {
	return (
		<div className="potion-row">
			{(() => {
				const cells = [];
				for (let i = 0; i < len-1 ; i++) {
					cells.push(<PotionCell key={i} row={row} col={i} onblur={onblur}/>);
				}
				return cells;
			})()}
		</div>
	);
};

export default PotionRow;
