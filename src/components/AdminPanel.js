import React from 'react';
import { Group, List, CellButton } from "@vkontakte/vkui";

const AdminPanel = ({go}) => {
    return (
        <Group title="Панель управления">
            <List>
                <CellButton onClick={go} data-to="org-events">
                    Мои мероприятия
                </CellButton>
                <CellButton onClick={go} data-to="event-form">
                    Создать мероприятие
                </CellButton>
                <CellButton onClick={go} data-to="task-form">
                    Создать задание
                </CellButton>
            </List>
        </Group>
    )
}

export default AdminPanel;