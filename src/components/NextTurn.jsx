import React from "react";

const NextTurn = ({ player, nextTurn, active }) => {
	return (
		<div className={"next-turn" + (active ? " active" : "")}>
			<h2>Are you ready, {player}?</h2>

			<button onClick={nextTurn}>Start Next Turn</button>
		</div>
	);
};

export default NextTurn;
