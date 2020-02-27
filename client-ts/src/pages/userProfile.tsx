import React from 'react';

export const UserProfile = () => {
	const hero = localStorage.getItem('userData');
	return(
		<>
			{hero}
		</>
	);
}