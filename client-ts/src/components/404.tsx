import React from 'react';
import { Button } from './button';
import {Link} from 'react-router-dom';
import { NotFoundProps } from '../interfaces/iComponents/404Props';

export const NoPage: React.SFC<NotFoundProps> = (props) => {
	return(
		<>
			<h1>Didnt find hero with name : <span className='error'>{props.name}</span></h1>
			<Link to={{ pathname: '/main'}}>
				<Button
					text='Go to main'
					className='waves-effect waves-light btn'
					type='button'
				/>
			</Link>
		</>
	);
};
