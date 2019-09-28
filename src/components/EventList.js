import React, { useState, useEffect } from 'react';
import { Group, List, Cell, Avatar, Button,  Div } from '@vkontakte/vkui';

const EventList = ({ events, title, go, active }) => {
	const [eventCells, setEventCells] = useState([]);

	useEffect(() => {
		setEventCells(events.map(item => {
			if(!active) {
				return  (<Cell onClick={go} data-to="event" data-event={JSON.stringify(item)}
							before={<Avatar src={item.photo_100} />} description={item.activity}>
							{item.name}
						</Cell>)
			}

			const isApplied = Boolean(JSON.parse(item.isApplied));
			const isActive = Boolean(JSON.parse(item.isOpenToApply)) && !isApplied;

			return isActive ?
				(<Cell onClick={go} data-to="event" data-event={JSON.stringify({...item, active})}
					before={<Avatar src={item.photo_100} />} description={item.activity}
					asideContent={<Button onClick={alert} >Записаться</Button>} >
					{item.name}
				</Cell>) : (
					<Cell onClick={go} data-to="event" data-event={JSON.stringify(item)}
					before={<Avatar src={item.photo_100} />} description={item.activity}
					asideContent={ isApplied ? <Div>Вы записаны</Div> : <Div>Запись закрыта</Div>} >
					{item.name}
				</Cell>
				);
		}));
	}, [events, go, active]);

	return (
		<Group title={title}>
			<List>
				{eventCells}
			</List>
		</Group>
	);
};

export default EventList;