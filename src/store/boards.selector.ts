import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectBoard = createSelector(
	[
		(state: RootState) => state.boards.boards,
		(state: RootState, id: string) => id
	],
	(boards, id: string) => {
		return  boards.find(x => x.id === id)
	}
);
