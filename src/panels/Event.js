import React, { useState, useEffect } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import { platform, IOS, Group,
    Cell, Button, Avatar,
    InfoRow, List,
    FormLayoutGroup, Checkbox, FormLayout,
    HeaderButton, Panel, PanelHeader
} from '@vkontakte/vkui';
const osName = platform();

const Event = ({ event, go, id, register }) => {
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        setEventData(JSON.parse(event));
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
            <Group>
                <Cell
                    photo={eventData.photo_200}
                    //todo через start_date
                    description={eventData.activity}
                    //<Link href={`https://vk.com/club${eventData.id}`}><Button>Группа мероприятия</Button></Link>
                    bottomContent={eventData.description}
                    before={<Avatar src={eventData.photo_200} size={80} />}
                    size="l"
                >
                    {eventData.name}
                </Cell>
            </Group>
            <Group>
                <List>
                    <Cell multiline>
                        <InfoRow title="Описание">
                            {eventData.description}
                        </InfoRow></Cell>
                    <Cell multiline>
                        <InfoRow title="Задачи волонтеров">
                            {eventData.description}
                        </InfoRow>
                    </Cell>
                    {eventData.active && <FormLayout>
                        <FormLayoutGroup top="Выберите удобное время">
                            <Checkbox>15:00 - 18:00</Checkbox>
                            <Checkbox>18:00 - 21:00</Checkbox>
                        </FormLayoutGroup>
                        <Button onClick={register} data-id={eventData.id} >Записаться</Button>
                    </FormLayout>}

                </List>
            </Group>

        </Panel>
    )
};

export default Event;
