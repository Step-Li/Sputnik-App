import React from 'react';
import { Group, List, CellButton } from "@vkontakte/vkui";

const AdminPanel = ({go}) => {
    return (
        <Group title="Панель управления">
            <List>
                <CellButton> 
                    Мои мероприятия
                </CellButton>
                <CellButton>
                    Создать мероприятие
                </CellButton>
            </List>
        </Group>
    )
}

export default AdminPanel;