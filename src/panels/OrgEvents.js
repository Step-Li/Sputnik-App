import React, { useState, useEffect } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import EventList from '../components/EventList';
import {
    platform, IOS,
    HeaderButton, Panel, PanelHeader, Cell, Avatar
} from '@vkontakte/vkui';

const osName = platform();


const OrgEvents = ({ id, go, user }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function getOrgEvents() {
            const resp = await fetch(`https://demo11.alpha.vkhackathon.com:433/api/events/getMyOrgEvents?auth=oX5n!E2i.VpWpHeo8E6F0q&vk_id=${user.id}`, {
                mode: "cors"
            });

            const eventsData = await resp.json();

            setEvents(eventsData);
        }

        getOrgEvents();
    }, [])

    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}
            >
                Мои мероприятия
        </PanelHeader>
            {events && events.map(item => {
                item.id = item.vk_id;
                return (<Cell onClick={go} data-to="vol-list" data-event={JSON.stringify(item)}
                    before={<Avatar src={item.photo_100} />} description={item.activity || item.date}
                >
                    {item.name}
                </Cell>);
            })}
        </Panel>
    );
}

export default OrgEvents;
