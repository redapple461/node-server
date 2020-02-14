import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { DashBoardItemProps } from '../interfaces/iComponents/DashBoardItemProps';

export const DashboardItem: React.SFC<DashBoardItemProps> = (props) => {
	return(
		<div className='dashboard' key={props.hero.id}>
			<Link  to={'/detailHero/' + props.hero.name} >
				<Button className={props.className} text={props.hero.name}/>
			</Link>
		</div>
	);
};
