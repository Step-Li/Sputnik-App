import React, { useState, useEffect }  from 'react';
import connect from '@vkontakte/vk-connect';
import EventList from '../components/EventList';
import Profile from "../components/Profile";
import AdminPanel from '../components/AdminPanel';

import { Panel, PanelHeader } from '@vkontakte/vkui';

const Home = ({ id, go, alert, fetchedUser, token }) => {
	const [groups, setGroups] = useState(null);
	const [actualEvents, setActualEvents] = useState([]);

	useEffect(() => {
		async function getActualEvents() {
			const resp = await fetch(`https://demo11.alpha.vkhackathon.com:433/api/events/getActualEvents?auth=oX5n!E2i.VpWpHeo8E6F0q&user_id=${fetchedUser.id}`, {
                mode: "cors"
            });

			let actualEvents = await resp.json();
			
			const vkIds = actualEvents.map(item => item.vk_id);

			const vkGroups = await connect.sendPromise("VKWebAppCallAPIMethod", {
				"method": "groups.getById",
				"request_id": "actual_events_from_vk",
				"params": {
					"v":"5.101",
					"group_ids": vkIds.join(','),
					"fields": "activity,photo_100,place,description,start_date,finish_date,photo_200",
					"access_token": token
				}
			});

			actualEvents = vkGroups.response.map((item, i) =>  {
				item.sputnik_id = actualEvents[i].id;
				item.isOpenToApply = actualEvents[i].is_open_to_apply;
				item.isApplied = actualEvents[i].is_user_applied;
				item.organizerId = actualEvents[i].organizer_id;
				item.managerId = actualEvents[i].manager_id;
				return item;
			})

		    setActualEvents(actualEvents);
		}

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
			setGroups(groups && groups.response);
		}

		fetchData();
		if(fetchedUser) getActualEvents();
		
    }, [token, fetchedUser]);

	return (
		<Panel id={id}>
			<PanelHeader>
				Спутник
			</PanelHeader>
			{fetchedUser &&
				<Profile go={go} fetchedUser={fetchedUser}/>
			}
			{fetchedUser && fetchedUser.admin && <AdminPanel go={go} ></AdminPanel>}
			{groups && <EventList title="Предстоящие мероприятия" events={actualEvents} go={go} active={true} alert={alert} />}
			{groups && <EventList title="Прошедшие мероприятия" events={groups} go={go} active={false} alert={alert} />}
		</Panel>
	)
};

export default Home;
