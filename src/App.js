<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';

import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
=======
import React from 'react';
>>>>>>> Events and Questionnaire Templates
import '@vkontakte/vkui/dist/vkui.css';
import { View, Panel, PanelHeader, FormLayout, Radio, InfoRow, Div, Group, List, Cell,
    Input, Checkbox, Button, Select, FormLayoutGroup, Textarea, Link } from '@vkontakte/vkui';

<<<<<<< HEAD
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
		</View>
	);
};

//----------------Questionnaire---------------------
class Questionnaire extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            father_name: ''
        }
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    render() {
         return (
            <View activePanel="new-user">
                <Panel id="new-user" theme="white">
                    <PanelHeader>Анкета волонтёра</PanelHeader>
                    <FormLayout>
                        <Input top="Фамилия" name='first_name' onChange={this.onChange} />
                        <Input top="Имя" name='last_name' onChange={this.onChange} />
                        <Input top="Отчество" name='first_name' onChange={this.onChange} />

                        <Div><InfoRow title='Дата рождения'>20 июня 1999</InfoRow></Div>

                        <Select top="Пол" placeholder="Выберите пол">
                            <option value="m">Мужской</option>
                            <option value="f">Женский</option>
                        </Select>

                        <Input
                            type="email"
                            top="E-mail"
                            name="email"
                        />

                        <Input top='Телефон'/>

                        <Input top='Место учёбы/работы'/>
                        <Input top='Специальность'/>
                        <Input top='Языки' />

                        <Textarea top='Опыт волонтёрской деятельности'/>
                        <Textarea top='Опыт работы с детьми'/>
                        <Textarea top='Дополнительные навыки'/>
                        <Textarea top='Ожидания'/>
                        <Textarea top='Медицинские противопоказания'/>
                        <Textarea top='Предпочтения в еде'/>
                        <Textarea top='Откуда Вы о нас узнали?'/>

                        <Select top="Размер одежды" placeholder="Выберите размер одежды">
                            <option value="xs">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                        </Select>

                        <Checkbox>Согласны ли Вы на получение рассылки?</Checkbox>

                        <Button size="xl">Отправить анкету</Button>
                    </FormLayout>
                </Panel>
            </View>
        );
    }
}


export default App;

