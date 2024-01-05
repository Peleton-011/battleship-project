import React from "react";
import Column from "./Column";
import { useState, useEffect, useRef } from "react";

const Board = ({ size, board, onClick, isSmall }) => {
	return (
		<div className={"board" + (isSmall ? " small" : "")}>
			<Column col={0} len={size} contents={board} onclick={onClick} />
			{board.map((col, i) => (
				<Column
					key={i + 1}
					col={i + 1}
					len={size}
					contents={col}
					onclick={onClick}
				/>
			))}
		</div>
	);
};

export default Board;
