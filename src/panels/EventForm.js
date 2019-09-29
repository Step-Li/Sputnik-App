import React, { useState, useEffect } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Add from '@vkontakte/icons/dist/16/add';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';

import {
    platform, IOS, FormLayout,
    HeaderButton, Panel, PanelHeader, Group, CellButton, Cell, Avatar, Button, Textarea, FormLayoutGroup
} from '@vkontakte/vkui';
const osName = platform();

const EventForm = ({ go, id, openModal, selectedEventJSON, periodsList, clearSelectedEvent }) => {
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        setSelectedEvent(JSON.parse(selectedEventJSON));
        setPeriods(periodsList);
    }, [selectedEventJSON, periodsList]);

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
                    asideContent={<Button before={<Icon16Cancel/>} level="destructive" onClick={clearSelectedEvent}>Удалить</Button>}
                >
                    {selectedEvent.name}</Cell>}
                <CellButton onClick={openModal} data-modal_id='select-event'>{selectedEvent ? 'Изменить' : 'Привязать мероприятие'}</CellButton>
            </Group>
            <Group>
                <FormLayout>
                    <Textarea top="Задачи волонтеров"></Textarea>
                    <FormLayoutGroup top="Временные промежутки">
                        {JSON.stringify(periods)}
                        <CellButton before={<Icon16Add/>} onClick={openModal} data-modal_id='add-time-period'>Добавить
                            временной промежуток</CellButton>
                    </FormLayoutGroup>
                </FormLayout>
            </Group>
        </Panel>
    )
};

export default EventForm;
