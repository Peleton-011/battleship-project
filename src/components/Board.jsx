import React from "react";
import Column from "./Column";
import { useState, useEffect, useRef } from "react";

const Board = ({ size, board: argBoard, onClick, isSmall }) => {
	const board = isSmall
		? argBoard
		: [
				Array(size)
					.fill(null)
					.map((e, i) => i + 1),
				...argBoard,
		  ].map((col, i) => {
				const newElem = i === 0 ? null : (i + 9).toString(36).toUpperCase();
                return [newElem, ...col]
		  });

	console.log(board);

	return (
		<div className={"board" + (isSmall ? " small" : "")}>
			{board.map((col, i) => {
				return (
					<Column
						key={i}
						col={i}
						len={size}
						content={col}
						onclick={onClick}
					/>
				);
			})}
		</div>
	);
};

export default Board;
