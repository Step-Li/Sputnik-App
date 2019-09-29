import React, { useState, useEffect } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import connect from '@vkontakte/vk-connect';

import {
    platform, IOS,
    HeaderButton, Panel, PanelHeader, Cell, Avatar, Group, List, CellButton
} from '@vkontakte/vkui';

const osName = platform();


const VolunteersList = ({ id, go, event, token, alert }) => {
    const [users, setUsers] = useState([]);
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        async function getVolunteers(event) {
            const users = await connect.sendPromise("VKWebAppCallAPIMethod", {
                "method": "users.get",
                "request_id": "volunteers_from_vk",
                "params": {
                    "v": "5.101",
                    "user_ids": event.volunteers.map(item => item.volunteer_id).join(','),
                    "fields": "photo_100",
                    "access_token": token
                }
            });
            setUsers(users.response);
        }

        const parsedEvent = JSON.parse(event);
        if (parsedEvent) {
            getVolunteers(parsedEvent);
            setEventName(parsedEvent.name);
        }
    }, [event])

    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="org-events">
                    {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}
            >
                {eventName}
            </PanelHeader>
            <Group title="Волонтеры">
                <List>
                    {users.map(user => {
                        return (<Cell expandable before={<Avatar src={user.photo_100} size={48} />} size="m">
                            {`${user.first_name} ${user.last_name}`}
                        </Cell>);
                    })}
                </List>
            </Group>
        </Panel>
    );
}

export default VolunteersList;
