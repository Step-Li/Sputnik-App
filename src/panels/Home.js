import React from 'react';
import EventList from '../components/EventList';
import Profile from "../components/Profile";

import { Div, Avatar, Cell, Panel, PanelHeader, Group } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser, groups, alert }) => {
	return (
		<Panel id={id}>
			<PanelHeader>
				Спутник
			</PanelHeader>
			{fetchedUser &&
				<Profile go={go} fetchedUser={fetchedUser}/>
			}
			{groups && <EventList title="Предстоящие мероприятия" events={groups} go={go} active={true} alert={alert} />}
			{groups && <EventList title="Прошедшие мероприятия" events={groups} go={go} active={false} alert={alert} />}
		</Panel>
	)
};

export default Home;
