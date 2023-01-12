

export interface IBoard {
	id: string;
	name: string;
	lists: IBoardList[];
}

export interface IBoardList {
	id: string;
	name: string
	items: IBoardListItem[];
}

export interface IBoardListItem {
	id: string;
	name: string
}