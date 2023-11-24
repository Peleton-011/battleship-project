import React from "react";
import Column from "./Column";
import { useState, useEffect } from "react";
import GameBoard from "../board";

const Board = (S) => {
	const board = new GameBoard();
	const len = 10;

	const emptyContent = [];
	for (let i = 0; i < len; i++) {
		const col = [];
		for (let j = 0; j < len; j++) {
			col.push([]);
		}
		emptyContent.push(col);
	}

	const [contents, setContents] = useState(emptyContent);
	const [onClick, setOnClick] = useState(() => {});
	//Upon placing a ship the onclick should change to place the next ship; once all ships have been placed it should be set to attack, and the board should update from that point onward toggling between perspectives to attack and watch the enemy's attacks
	useEffect(() => {}, [board.ships]);

	useEffect(() => {
		setContents(board.board);
	}, [...board.board]);

	const sendAttack = (e, x, y) => {
		console.log("Clickity Click! (" + x + ", " + y + ")");
	};
	const placeShip = (e, x, y) => {};

	return (
		<div className="board-wrapper">
			<div className="board">
				{(() => {
					const cols = [];
					for (let i = 0; i < len + 1; i++) {
						cols.push(
							<Column
								key={i}
								col={i}
								len={len}
								contents={
									i === 0 ? contents : board.board[i - 1]
								}
								onclick={sendAttack}
							/>
						);
					}
					return cols;
				})()}
			</div>

			{/* <PotionBoard len={len} onblur={potionOnBlur} /> */}
		</div>
	);
};

export default Board;
