import { useNavigate, useParams } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import React, { useState } from 'react';
import { useAppActions, useAppSelector } from '../../store/hooks';
import { Guid } from 'guid-typescript';
import { selectBoard } from '../../store/boards.selector';


export const List = () => {
	const { id } = useParams();
	const [creatingNewList, setCreatingNewList] = useState(false);
	const [newListName, setNewListName] = useState('');

	const board = useAppSelector((state) => selectBoard(state, id ?? ''))
	const {addList, removeList} = useAppActions()

	const createNewListHandle = () => {
		if (!id) {
			return ;
		}
		addList({
			boardId: id,
			list: {
				id: Guid.create().toString(),
				name: newListName,
				items: []
			}
		})
		setCreatingNewList(false);
		setNewListName('');
	}


	const handleRemoveList = (e: React.MouseEvent, listId: string) => {
		e.stopPropagation();
		if (!id) {
			return ;
		}
		removeList({
			boardId: id,
			listId: listId
		})
		// removeBoard(id);
	}
	return <div className="flex gap-5 flex-wrap items-start">
		<div  onClick={() => !creatingNewList && setCreatingNewList(true)}
		      className={" w-[300px] bg-blue-500 text-white border shadow p-5 rounded " + (creatingNewList ? "" : " cursor-pointer  hover:bg-blue-600 transition-all")}
		>
			<div className={creatingNewList ? ""  : "text-center"}>
				{
					creatingNewList ? "Creating a list" : "Create a new list"
				}
			</div>
			{
				creatingNewList &&
                <div>
                    <div className="pt-10 pb-5 text-sm">
                        What shall we call the list?
                    </div>
                    <input onKeyDown={e => e.key === 'Enter' && createNewListHandle()} value={newListName} onChange={(e) => setNewListName(e.target.value)} className="text-black w-full border rounded p-2" type="text"/>
                    <div className="mt-5 flex justify-end gap-5">
                        <button onClick={() => setCreatingNewList(false)} className="rounded p-2">
                            Cancel
                        </button>
                        <button onClick={createNewListHandle} className="rounded p-2 bg-amber-500 ">
                            Create
                        </button>
                    </div>
                </div>
			}
		</div>
		{
			board?.lists.map(list => {
				return <div key={list.id} className="relative w-[300px] border shadow p-5 rounded">
					<AiFillCloseCircle onClick={e => handleRemoveList(e, list.id)} className="absolute top-[-5px] right-[-5px] hover:scale-110"></AiFillCloseCircle>
					<div>
						{list.name}
					</div>
					<div className="mt-5  flex gap-2">
						<input onKeyDown={e => e.key === 'Enter' && createNewListHandle()} onChange={(e) => setNewListName(e.target.value)} className="text-black w-full border rounded p-2" type="text"/>
						<button className="h-[42px] rounded px-2 bg-amber-500 ">
							Add
						</button>
					</div>
				</div>
			})
		}
	</div>

}