import React from "react";
import Cell from "./Cell";
import { useState, useEffect, useRef } from "react";

const Board = ({ size, board: argBoard, onClick, isSmall }) => {
	const board = isSmall
		? argBoard
		: [
				//Add number column
				Array(size)
					.fill(null)
					.map((e, i) => i),
				...argBoard,
		  ].map((col, i) => {
				//Add letter row
				const newElem =
					i === 0 ? null : (i + 9).toString(36).toUpperCase();
				return [newElem, ...col];
		  });


	return (
		<div className={"board" + (isSmall ? " small" : "")}>
			{board.map((col, i) => {
				return (
					<div className="column" key={i}>
						{col.map((val, j) => {
							return (
								<Cell
									key={j}
									col={i}
									row={j}
									content={val}
									onclick={onClick}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Board;
