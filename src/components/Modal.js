import React, { useState, useEffect } from 'react';
import { ModalRoot, ModalPage, ModalPageHeader, HeaderButton, platform, IOS, Group, List, Cell, Avatar, Button } from "@vkontakte/vkui";

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';

const osName = platform();

const Modal = ({ activeModalId, closeModal, eventsList }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [listEventCells, setListEvents] = useState(null);

	useEffect(() => {
		setActiveModal(activeModalId);
  }, [activeModalId]);

  useEffect(() => {
		setListEvents(eventsList && eventsList.response && eventsList.response.map(() => {
      return (<Cell
        before={<Avatar size={56} />}
        size="xl"
        description="Друзья в Facebook"
        asideContent={
            <Button size="l">Привязать</Button>
        }
      >
        Семён Ефимов</Cell>)
    }));
  }, [eventsList]);

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id="select-event"
        onClose={closeModal}
        data-selected_event='null'
        header={
          <ModalPageHeader
            left={osName !== IOS && <HeaderButton onClick={closeModal} data-selected_event='null'><Icon24Cancel /></HeaderButton>}
            right={<HeaderButton onClick={closeModal} data-selected_event='124124'>{osName === IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}
          >
            Фильтры
          </ModalPageHeader>
        }>
        <Group title="Большая ячейка">
              <List>
              {listEventCells}
              </List>
        </Group>
      </ModalPage>
    </ModalRoot>
  );
}

export default Modal;
