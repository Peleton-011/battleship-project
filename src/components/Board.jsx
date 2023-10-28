import React from "react";
import Column from "./Column";
import { useState, useEffect } from "react";

const Board = ({ board }) => {

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
    useEffect(() => {
        setContents(board.board)
    }, [...board.board])

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
