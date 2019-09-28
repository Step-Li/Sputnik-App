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

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [activeModalPage, setActiveModalPage] = useState(null);
	const [openedEvent, setOpenedEvent] = useState(null);
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

	const register = () => {
		// id do smth
		fetch(`https://demo11.alpha.vkhackathon.com:8443/api/user/getRating?auth=oX5n!E2i.VpWpHeo8E6F0q&user_id=2342343`)
			.then((res) => {
				res.json().then((json) => {
					showPopout(JSON.stringify(json))
				}).catch((e) => {
					showPopout(JSON.stringify({"catch json": e}))	
				})
			}
			).catch((err) => {
				showPopout(JSON.stringify({"catch": err}))
			  });
	}

	const openModalSelect = e => {
		setActiveModalPage(e.currentTarget.dataset.modal_id);
	}

	const clearSelectedEvent = () => {
		setSelectedEvent(null);
	}

	const closeModal = e => {
		if (e && e.currentTarget.dataset.selected_event) {
			setSelectedEvent(e.currentTarget.dataset.selected_event);
		}
		setActiveModalPage(null);
	}

	return (
		<View activePanel={activePanel} popout={popout} 
			modal={
				<Modal token={token} closeModal={closeModal} activeModalId={activeModalPage}></Modal>
			}>
			<Home id='home' go={go} alert={alert} fetchedUser={fetchedUser} token={token} />
			<Questionnaire id='new-user' go={go} data={fetchedUser} />
			<Event id='event' event={openedEvent} go={go} register={register} />
			<EventForm id='event-form' go={go} openModalSelect={openModalSelect} clearSelectedEvent={clearSelectedEvent} selectedEventJSON={selectedEvent} />
		</View>
	);
};

export default App;

