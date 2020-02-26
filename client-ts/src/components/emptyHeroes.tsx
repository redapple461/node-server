import React from 'react';

export const EmptyHeroes = (props) => {
	return(
		<>
			<h1 className='error'> {props.text} </h1>
		</>
	);
};
