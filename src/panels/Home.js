import React from 'react';
import EventList from '../components/EventList';

import { Div, Avatar, Cell, Panel, PanelHeader, Group } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser, groups, alert }) => {
	return (
		<Panel id={id}>
			<PanelHeader>
				Спутник
			</PanelHeader>
			{fetchedUser &&
				<Group title="Мой профиль">
					<Cell
						before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
						description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
						asideContent={<Div>Рейтинг: 4.5</Div>}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>}
			{groups && <EventList title="Предстоящие мероприятия" events={groups} go={go} active={true} alert={alert} />}
			{groups && <EventList title="Прошедшие мероприятия" events={groups} go={go} active={false} alert={alert} />}
		</Panel>
	)
};

export default Home;
