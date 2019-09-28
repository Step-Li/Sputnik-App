import React, { useState, useEffect }  from 'react';
import connect from '@vkontakte/vk-connect';
import EventList from '../components/EventList';
import Profile from "../components/Profile";
import AdminPanel from '../components/AdminPanel';

import { Panel, PanelHeader } from '@vkontakte/vkui';

const Home = ({ id, go, alert, fetchedUser, token }) => {
	const [groups, setGroups] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const groups = await connect.sendPromise("VKWebAppCallAPIMethod", {
				"method": "groups.getById",
				"request_id": "groups_from_base",
				"params": {
					"v":"5.101",
					"group_ids": "gagadnd,210,324,43545,43452,5656,13",
					"fields": "activity,photo_100,place,description,start_date,finish_date,photo_200",
					"access_token": token
				}
			});
			setGroups(groups);
		}

		fetchData();
		
    }, [token]);

	return (
		<Panel id={id}>
			<PanelHeader>
				Спутник
			</PanelHeader>
			{fetchedUser &&
				<Profile go={go} fetchedUser={fetchedUser}/>
			}
			{fetchedUser && fetchedUser.admin && <AdminPanel go={go} ></AdminPanel>}
			{groups && <EventList title="Предстоящие мероприятия" events={groups} go={go} active={true} alert={alert} />}
			{groups && <EventList title="Прошедшие мероприятия" events={groups} go={go} active={false} alert={alert} />}
		</Panel>
	)
};

export default Home;
