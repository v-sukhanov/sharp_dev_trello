import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IBoard } from '../models/board.interface';

type Return = (state: RootState) => IBoard | undefined;

export const selectBoard = (id: string): Return =>
	createSelector(
		[(state: RootState) => {
			return state.boards.boards.find(x => x.id === id)
		}],
		(board) => board
	);