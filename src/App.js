import React, { useState, useEffect }  from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import { View, Alert } from '@vkontakte/vkui';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

import Questionnaire from "./panels/Questionnaire";
import Home from './panels/Home';
import Event from './panels/Event';
import EventForm from './panels/EventForm';
import Modal from  './components/Modal';
import TaskForm from './panels/TaskForm';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [activeModalPage, setActiveModalPage] = useState(null);
	const [openedEvent, setOpenedEvent] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [fetchedUser, setUser] = useState(null);
	const [token, setToken] = useState('');
	const [periods, setPeriods] = useState([]);
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
			setUser({...user, admin: true});
			setToken(token.access_token);
			setPopout(null);
		}

		fetchData();
	}, []);

	const go = (e) => {
		setActivePanel(e.currentTarget.dataset.to);
		if (e.currentTarget.dataset.event) {
			setOpenedEvent(e.currentTarget.dataset.event);
		}
	};

	const closePopout = () => {
		setPopout(null);
	};

	const showPopout = (message) => {
		setPopout(
			<Alert
			actionsLayout="vertical"
			onClose={closePopout}
		  >
			<h2>{message}</h2>
		  </Alert>
		);
	};

	const alert = e => {
		showPopout(e.currentTarget.dataset.message);
	}

	async function register(e) {
		const res = await fetch(`https://demo11.alpha.vkhackathon.com:433/api/events/applyForEvent
		?auth=oX5n!E2i.VpWpHeo8E6F0q
		&user_vk_id=${fetchedUser.id}
		&event_id=${e.currentTarget.dataset.event_id}
		&time_period_ids=${e.currentTarget.dataset.period_ids}`, {
			mode: "cors"
		});
		const status = await res.json();
		if (status.success) {
			showPopout("Вы успешно зарегистрировались");
		}
	}

	const openModal = e => {
		setActiveModalPage(e.currentTarget.dataset.modal_id);
	}

	const clearSelectedEvent = () => {
		setSelectedEvent(null);
	}

	const closeModal = e => {
		if (e && e.currentTarget && e.currentTarget.dataset.selected_event) {
			setSelectedEvent(e.currentTarget.dataset.selected_event);
		}
		if (e && e.period) {
			setPeriods([...periods, e.period]);
		}
		setActiveModalPage(null);
	}

	return (
		<View activePanel={activePanel} popout={popout} 
			modal={
				<Modal token={token} closeModal={closeModal} activeModalId={activeModalPage}></Modal>
			}>
			<Home id='home' go={go} alert={alert} fetchedUser={fetchedUser} token={token} />
			<Questionnaire id='new-user' go={go} data={fetchedUser} alert={showPopout} />
			<Event id='event' event={openedEvent} go={go} register={register} />
			<EventForm id='event-form' go={go} periodsList={periods} openModal={openModal} clearSelectedEvent={clearSelectedEvent} selectedEventJSON={selectedEvent} />
			<TaskForm id='task-form' go={go} />
		</View>
	);
};

export default App;

