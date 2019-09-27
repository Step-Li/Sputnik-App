import React from 'react';
import { Group, Cell, Div } from '@vkontakte/vkui';

const Profile = ({ fetchedUser}) => {
	return (
		<Group title="Мой профиль">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                asideContent={<Div>Рейтинг: 4.5</Div>}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>
	);
};

export default Profile;