import React from 'react';
import { Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Profile = ({ fetchedUser, go}) => {
	return (
		<Group title="Мой профиль" onClick={go} data-to="new-user">
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