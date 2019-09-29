import React, { useState, useEffect } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {
    platform, IOS, Group,
    Cell, Button, Avatar, Div,
    InfoRow, List,  Link,
    FormLayoutGroup, Checkbox, FormLayout,
    HeaderButton, Panel, PanelHeader
} from '@vkontakte/vkui';
const osName = platform();

export async function getEventDBData(event, setEventData) {
    const resp = await fetch(`https://demo11.alpha.vkhackathon.com:433/api/events/getEvent?auth=oX5n!E2i.VpWpHeo8E6F0q&id=${event.eventId}`, {
        mode: "cors"
    });

    const eventDB = await resp.json();

    setEventData({ VK: event, ...eventDB });
}

const Event = ({ event, go, id, register }) => {
    const [eventData, setEventData] = useState({});

    useEffect(() => {

        const eventShort = JSON.parse(event);
        getEventDBData(eventShort, setEventData);

    }, [event]);

    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}
            >
                {eventData.active ? 'Запись на мероприятие' : "Описание мероприятия"}
            </PanelHeader>
            {eventData.VK && eventData.VK.id && <Group>
                <Cell
                    photo={eventData.VK.photo_200}
                    //todo через start_date
                    description={eventData.VK.activity}
                    bottomContent={eventData.VK.description}
                    asideContent={<Link href="https//m.vk.com/totaldict" target="_blank"><Button>В группу</Button></Link>}
                    before={<Avatar src={eventData.VK.photo_200} size={56} />}
                    size="l"
                >
                    {eventData.VK.name}
                </Cell>
            </Group>}
            <Group>
                <List>
                    <Cell multiline>
                        <InfoRow title="Название">
                            {eventData.name}
                        </InfoRow></Cell>
                    <Cell multiline>
                        <InfoRow title="Описание">
                            {eventData.description}
                        </InfoRow></Cell>
                    <Cell multiline>
                        <InfoRow title="Дата проведения">
                            {eventData.date}
                        </InfoRow></Cell>
                    <Cell multiline>
                        <InfoRow title="Место проведения">
                            {eventData.place}
                        </InfoRow></Cell>
                    <Cell multiline>
                        <InfoRow title="Задачи волонтеров">
                            {eventData.volunteers_task}
                        </InfoRow>
                    </Cell>
                    <Cell multiline>
                        <InfoRow title="Требования к волонтерам">
                            {eventData.volunteer_requirements}
                        </InfoRow>
                    </Cell>
                    {eventData.VK && eventData.VK.active && <FormLayout>
                        <FormLayoutGroup top="Выберите удобное время">
                            { eventData.time_periods && eventData.time_periods.map(period =>  {
                                const isAvailable = period.is_available == 'true';
                                return isAvailable? (
                                    <Checkbox>{period.time_period}</Checkbox>
                                ) : (
                                    <Div>{period.time_period}</Div>
                                );
                            })}
                        </FormLayoutGroup>
                        <Button onClick={register} data-period_ids={'1,2,3'} data-event_id={eventData.VK.id}>Записаться</Button>
                    </FormLayout>}

                </List>
            </Group>

        </Panel>
    )
};

export default Event;
