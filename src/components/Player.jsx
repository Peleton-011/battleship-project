import React from "react";
import Board from "./Board";
import Ship from "../Ship";
import { useState } from "react";

const Player = ({
	board,
	enemyBoard,
	size,
	nextIndex,
	active,
	player,

	placeShip,
	attack,
    shipsPlaced
}) => {



	return (
		<div className={"board-wrapper" + (active ? " active" : "")}>
			<h2>
				{player}, {nextIndex >= 0 ? "place your ships" : "attack"}
			</h2>
			<Board
				board={board}
				onClick={placeShip}
				size={size}
				isSmall={shipsPlaced}
			/>
			{shipsPlaced && (
				<Board
					isSmall={false}
					board={enemyBoard}
					onClick={attack}
					size={size}
				/>
			)}
		</div>
	);
};

export default Player;
