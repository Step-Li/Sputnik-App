import React from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';


import {
    platform, IOS,
    HeaderButton, Panel, PanelHeader, Button, Textarea, FormLayout, File
} from '@vkontakte/vkui';
const osName = platform();

const TaskForm = ({ go, id }) => {
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
                <File top="Загрузите ваше фото" before={<Icon24Camera />} size="l">
                    Открыть галерею
                </File>
                <Textarea top='Описание задания'>
                </Textarea>
                <Button>Разослать волонтерам</Button>
            </FormLayout>
        </Panel>
    )
};

export default TaskForm;
