import React, { useState, useEffect } from 'react';
import { ModalRoot, ModalPage, ModalCard, ModalPageHeader, HeaderButton, platform, IOS, Group, List, Cell, Avatar, Button, Input, FormLayout } from "@vkontakte/vkui";

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import connect from '@vkontakte/vk-connect';


const osName = platform();

const Modal = ({ activeModalId, closeModal, token }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [period, setPeriod] = useState({});
  const [listEventCells, setListEvents] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setPeriod({...period, [name]: value})
  }

  useEffect(() => {
    async function fetchData() {
      const groups = await connect.sendPromise("VKWebAppCallAPIMethod", {
        "method": "groups.get",
        "request_id": "groups_active",
        "params": {
          "v": "5.101",
          "filter": "events",
          "extended": "1",
          "fields": "activity,photo_100,place,description,start_date,finish_date,photo_200",
          "access_token": token
        }
      });

      setListEvents(groups && groups.response && groups.response.items && groups.response.items.map((item) => {
        return (<Cell
          before={<Avatar src={item.photo_100} size={56} />}
          size="xl"
          description={item.activity}
          asideContent={
            <Button onClick={closeModal} data-selected_event={JSON.stringify(item)} size="l">Привязать</Button>
          }
        >
          {item.name}</Cell>)
      }));
    }

    fetchData();
  }, [token, closeModal]);

  useEffect(() => {
    setActiveModal(activeModalId);
  }, [activeModalId])

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id="select-event"
        onClose={closeModal}
        data-selected_event='null'
        header={
          <ModalPageHeader
            left={osName !== IOS && <HeaderButton onClick={closeModal} data-selected_event='null'><Icon24Cancel /></HeaderButton>}
          >
            Мои мероприятия
          </ModalPageHeader>
        }>
        <Group>
          <List>
            {listEventCells}
          </List>
        </Group>
      </ModalPage>
      <ModalCard
        id='add-time-period'
        title="Укажите временной промежуток для работы"
        caption="Так же нужно максимальное количество волонтеров"
        actions={[{
          title: 'Добавить',
          type: 'primary',
          action: () => {
            closeModal({period});
          }
        }]}
      >
        <Group>
          <FormLayout>
            <Input top="Временной промежуток" 
            onChange={onChange} name="period"></Input>
            <Input top="Количество волонтеров" onChange={onChange} name="count"></Input>
          </FormLayout>
        </Group>
      </ModalCard>
    </ModalRoot>
  );
}

export default Modal;
