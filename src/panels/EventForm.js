import React, { useState, useEffect }  from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import { platform, IOS,
    HeaderButton, Panel, PanelHeader, Group, CellButton, Div
} from '@vkontakte/vkui';
const osName = platform();

const EventForm = ({ go, id, openModalSelect, selectedEventId }) => {
	const [selectedEvent, setSelectedEvent] = useState([]);

	useEffect(() => {
		setSelectedEvent(selectedEventId);
	}, [selectedEventId]);

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
                {selectedEvent && <Div>{selectedEvent}</Div>}
                <CellButton onClick={openModalSelect} data-modal_id='select-event'>Привязать мероприятие</CellButton>
            </Group>
        </Panel>
    )
};

export default EventForm;
