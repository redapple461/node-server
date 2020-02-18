import React from 'react';
import {RadioProps} from '../interfaces/iComponents/RadioProps';

export const RadioButton: React.SFC<RadioProps> = (props) => {
	return(
		<label>
			<input
				id={props.id}
				className={props.className}
				name={props.name}
				type={props.type || 'radio'}
				value={props.value}
				checked={props.checked}
				onChange={props.dispatch}
			/>
			<span>{props.text}</span>
		</label>
	);
};
