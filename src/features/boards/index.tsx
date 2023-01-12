import React, { useState } from 'react';
import { useAppActions, useAppSelector } from '../../store/hooks';
import { Guid } from 'guid-typescript';
import { useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';


export const Boards = () => {
	const [creatingNewBoard, setCreatingNewBoard] = useState(false);
	const [newBoardName, setNewBoardName] = useState('');

	const {boards} = useAppSelector(x => x.boards);
	const {addBoard, removeBoard} = useAppActions()

	const createNewBoardHandle = () => {
		addBoard({
			id: Guid.create().toString(),
			name: newBoardName,
			lists: []
		})
		setCreatingNewBoard(false);
		setNewBoardName('');
	}
	const navigate = useNavigate();

	const goToBoardHandler = (id: string) => {
		navigate({
			pathname: `/board/${id}`
		})
	}

	const handleRemoveBoard = (e: React.MouseEvent, id: string) => {
		e.stopPropagation();
		removeBoard(id);
	}
	return <div className="flex gap-5 flex-wrap items-start">
		<div  onClick={() => !creatingNewBoard && setCreatingNewBoard(true)}
		      className={" w-[300px] bg-blue-500 text-white border shadow p-5 rounded " + (creatingNewBoard ? "" : " cursor-pointer  hover:bg-blue-600 transition-all")}
		>
			<div className={creatingNewBoard ? ""  : "text-center"}>
				{
					creatingNewBoard ? "Creating a board" : "Create a new board"
				}
			</div>
			{
				creatingNewBoard &&
				<div>
					<div className="pt-10 pb-5 text-sm">
                        What shall we call the board?
					</div>
                    <input onKeyDown={e => e.key === 'Enter' && createNewBoardHandle()} value={newBoardName} onChange={(e) => setNewBoardName(e.target.value)} className="text-black w-full border rounded p-2" type="text"/>
					<div className="mt-5 flex justify-end gap-5">
						<button onClick={() => setCreatingNewBoard(false)} className="rounded p-2">
							Cancel
						</button>
						<button onClick={createNewBoardHandle} className="rounded p-2 bg-amber-500 ">
							Create
						</button>
					</div>
				</div>
			}
		</div>
		{
			boards.map(board => {
				return <div onClick={() => goToBoardHandler(board.id)} key={board.id} className="relative w-[300px] text-center border shadow p-5 rounded cursor-pointer  hover:bg-gray-100 transition-all">
					<AiFillCloseCircle onClick={e => handleRemoveBoard(e, board.id)} className="absolute top-[-5px] right-[-5px] hover:scale-110"></AiFillCloseCircle>
					{board.name}
				</div>
			})
		}
	</div>
}