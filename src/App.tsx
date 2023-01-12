import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Boards } from './features/boards';
import { Navigations } from './components/Navigations';
import { List } from './features/list';


export const App = () => {
	return (
		<div >
			<Navigations/>
			<div className="pt-[50px] mx-[50px]">
				<Routes>
					<Route path="/" element={ <Boards/> }></Route>
					<Route path="board/:id" element={ <List/> }></Route>
				</Routes>
			</div>
		</div>
	)
}