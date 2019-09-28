import React, { useState, useEffect } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {
    platform, IOS, FormLayout,
    HeaderButton, Panel, PanelHeader, Group, CellButton, Cell, Avatar, Button, Textarea, FormLayoutGroup
} from '@vkontakte/vkui';
const osName = platform();

const EventForm = ({ go, id, openModalSelect, selectedEventJSON, clearSelectedEvent }) => {
    const [selectedEvent, setSelectedEvent] = useState([]);

    useEffect(() => {
        setSelectedEvent(JSON.parse(selectedEventJSON));
    }, [selectedEventJSON]);

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
                <CellButton onClick={openModalSelect} data-modal_id='select-event'>{selectedEvent ? 'Изменить' : 'Привязать мероприятие'}</CellButton>
            </Group>
            <FormLayout>
                <Textarea top="Задачи волонтеров"></Textarea>
                <FormLayoutGroup top="Временные промежутки">
                    
                </FormLayoutGroup>
            </FormLayout>
        </Panel>
    )
};

export default EventForm;
