import React from "react";
import PotionRow from "./PotionRow";

const PotionBoard = ({ len, onblur}) => {
	return (
		<div className="potion-board">
			{(() => {
				const rows = [];
				for (let i = 0; i < len - 1; i++) {
					rows.push(<PotionRow key={i} row={i} len={len - i} onblur={onblur} />);
				}
				return rows;
			})()}
		</div>
	);
};

export default PotionBoard;
