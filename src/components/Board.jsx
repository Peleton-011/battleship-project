import React from "react";
import Column from "./Column";
import { useState, useEffect, useRef } from "react";

const Board = ({ size, board, onClick }) => {
	return (
		<div >
			
			<div className="board">
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

			{/* <PotionBoard len={len} onblur={potionOnBlur} /> */}
		</div>
	);
};

export default Board;
