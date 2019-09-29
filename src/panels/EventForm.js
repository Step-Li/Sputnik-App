import React, { useState, useEffect } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {
    platform, IOS, FormLayout, List, Div,
    HeaderButton, Panel, PanelHeader, Group, CellButton, Cell, Avatar, Button, Textarea, FormLayoutGroup, Input
} from '@vkontakte/vkui';
const osName = platform();

const EventForm = ({ go, id, openModal, selectedEventJSON, periodsList, userId, clearSelectedEvent }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formState, setFormState] = useState({});
    const [periods, setPeriods] = useState([]);

    const createEvent = () => {
        async function sendData() {
            const resp = await fetch(`https://demo11.alpha.vkhackathon.com:433/api/events/createEvent
?auth=oX5n!E2i.VpWpHeo8E6F0q&
user_vk_id=${userId}
vk_id=${formState.vk_id}
name=${formState.name}
description=${formState.description}
weight=${formState.weight}
date=${formState.date}
volunteers_task=${formState.volunteers_task}
volunteer_requirements=${formState.volunteer_requirements}
place=${formState.place}`, {
                    mode: "cors"
                });

            const success = await resp.json();
        }

        sendData();
    }

    useEffect(() => {
        const event = JSON.parse(selectedEventJSON);
        setSelectedEvent(event);
        if (event) {
            setFormState({ ...formState, name: event && event.name, vk_id: event.id, description: event.description })
        }
        setPeriods(periodsList);
    }, [selectedEventJSON, periodsList]);

    useEffect(() => {
        setFormState({ ...formState, time_periods: periods.map(item => `${item.period}%${item.count}`).join('$') })
    }, [periods])

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setFormState({ ...formState, [name]: value })
    };

    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}
            >
                Создать мероприятие
            </PanelHeader>

            <Group title="Группа мероприятия">
                {selectedEvent && <Cell
                    before={<Avatar src={selectedEvent.photo_100} size={56} />}
                    size="xl"
                    description={selectedEvent.activity}
                    asideContent={<Button onClick={clearSelectedEvent} >No</Button>}
                >
                    {selectedEvent.name}</Cell>}
                <CellButton onClick={openModal} data-modal_id='select-event'>{selectedEvent ? 'Изменить' : 'Привязать мероприятие'}</CellButton>
            </Group>
            <Group>

                <Div>{JSON.stringify(formState)}</Div>
                <FormLayout>
                    {selectedEvent ? <Input top="Название мероприятия" name="name" defaultValue={selectedEvent.name} onChange={onChange}></Input> :
                    <Input top="Название мероприятия" name="name" onChange={onChange}></Input>}
                    <Input top="Вес мероприятия" name="weight" onChange={onChange}></Input>
                    <Textarea top="Описание" name="description" onChange={onChange}>{"dfgdhd"}</Textarea>
                    <Input top="Дата проведения" name="date" onChange={onChange}></Input>
                    <Textarea top="Место проведения" name="place" onChange={onChange}></Textarea>
                    <Textarea top="Задачи волонтеров" name="volunteers_task" onChange={onChange}></Textarea>
                    <Textarea top="Требования к волонтерам" name="volunteer_requirements" onChange={onChange}></Textarea>
                    <FormLayoutGroup top="Временные промежутки">
                        <Group>
                            <List>
                                {periods.map((item, i) => (<Cell asideContent={item.count}>{item.period}</Cell>))}
                            </List>
                            <CellButton onClick={openModal} data-modal_id='add-time-period'>Добавить временной промежуток</CellButton>
                        </Group>
                    </FormLayoutGroup>
                    <Div>
                        <Button size="xl" onClick={createEvent} level="secondary">Создать</Button>
                    </Div>
                </FormLayout>
            </Group>
        </Panel>
    )
};

export default EventForm;
