
import React, { useState, useEffect }  from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import { View, Alert } from '@vkontakte/vkui';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

import Questionnaire from "./components/Questionnaire";
import Home from './panels/Home';
import Event from './panels/Event';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [fetchedUser, setUser] = useState(null);
	const [groups, setGroups] = useState(null);
	const [token, setToken] = useState('');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			const token = await connect.sendPromise("VKWebAppGetAuthToken", {"app_id": 7150436, "scope": "groups"});
			const groups = await connect.sendPromise("VKWebAppCallAPIMethod", {
				"method": "groups.getById",
				"request_id": "groups_from_base",
				"params": {
					"v":"5.101",
					"group_ids": "gagadnd,210,324",
					"fields": "activity,photo_100,place,description,start_date,finish_date,photo_200",
					"access_token": token.access_token
				}
			});
			setUser(user);
			setGroups(groups);
			setToken(token);
			setPopout(null);
		}

		fetchData();
	}, []);

	const go = (e) => {
		setActivePanel(e.currentTarget.dataset.to);
		if (e.currentTarget.dataset.event) {
			setSelectedEvent(e.currentTarget.dataset.event);
		}
	};

	const closePopout = () => {
		setPopout(null);
	};

	const alert = e => {
		setPopout(
			<Alert
			actionsLayout="vertical"
			actions={[{
			  title: 'id',
			  autoclose: true,
			  style: 'destructive'
			}, {
			  title: 'Отмена',
			  autoclose: true,
			  style: 'cancel'
			}]}
			onClose={closePopout}
		  >
			<h2>Подтвердите действие</h2>
			<p>Вы уверены, что хотите лишить пользователя права на модерацию контента?</p>
		  </Alert>
		);
	};

	return (
		<View activePanel={activePanel} popout={popout} >
			<Home id='home' fetchedUser={fetchedUser} go={go} groups={groups} alert={alert} />
			<Event id='event' event={selectedEvent} go={go} />
			<Questionnaire />
		</View>
	);
};

export default App;

