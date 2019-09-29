import React, { useState } from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';


import {
    platform, IOS,
    HeaderButton, Panel, PanelHeader, Button, Textarea, FormLayout, File, Div, Avatar
} from '@vkontakte/vkui';
const osName = platform();

const TaskForm = ({ go, id }) => {
    const [taskState, setTask] = useState({});

    const sendTask = () =>  {
        async function send() {
            const resp = await fetch(`https://demo11.alpha.vkhackathon.com:1488/api/tasks/create?auth=oX5n!E2i.VpWpHeo8E6F0q&message=${taskState.description}`, {
                mode: "cors"
            });

            const eventsData = await resp.json();
        }

        send();
    }

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setTask({...taskState, [name]: value});
    };

    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}
            >
                Создать задание
            </PanelHeader>
            <FormLayout>
                <File top="Загрузите ваше фото" name="file" onChange={onChange} before={<Icon24Camera />} size="l">
                    Открыть галерею
                </File>
                <Textarea name="description" onChange={onChange} top='Описание задания'>
                </Textarea>
                <Button onClick={sendTask}>Разослать волонтерам</Button>
            </FormLayout>
        </Panel>
    )
};

export default TaskForm;
