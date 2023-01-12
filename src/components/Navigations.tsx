import { Link } from 'react-router-dom';


export const Navigations = () => {
	return (
		<nav className="h-[50px] flex justify-between items-center px-10 bg-gray-500 text-white">
			<span>
				<Link to="/" className="font-bold mr-4">Trello</Link>
			</span>
		</nav>
	)
}