import { IBoard, IBoardList } from '../models/board.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const BOARDS_KEY = "BOARDS_KEY";

export interface IBoardsState {
	boards: IBoard[]
}

const initialState: IBoardsState = {
	boards: JSON.parse(localStorage.getItem(BOARDS_KEY) ?? '[]')
}

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		addBoard(state, payload: PayloadAction<IBoard>) {
			state.boards.unshift(payload.payload);
			localStorage.setItem(BOARDS_KEY, JSON.stringify(state.boards))
		},
		removeBoard(state, payload: PayloadAction<string>) {
			state.boards = state.boards.filter(x => x.id !== payload.payload);
			localStorage.setItem(BOARDS_KEY, JSON.stringify(state.boards))
		},
		addList(state, payload: PayloadAction<{boardId: string, list: IBoardList}>) {
			const candidate = state.boards.find(x => x.id === payload.payload.boardId);
			if (candidate) {
				candidate.lists.unshift(payload.payload.list);
				localStorage.setItem(BOARDS_KEY, JSON.stringify(state.boards))
			}
		},
		removeList(state, payload: PayloadAction<{boardId: string, listId: string}>) {
			const candidate = state.boards.find(x => x.id === payload.payload.boardId);
			console.log(candidate, payload.payload.boardId, state.boards.map(x => x.id))
			if (candidate) {
				candidate.lists = candidate.lists.filter(x => x.id !== payload.payload.listId)
				localStorage.setItem(BOARDS_KEY, JSON.stringify(state.boards))
			}
		}
	}
})

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;