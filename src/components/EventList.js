import React, { useState, useEffect } from 'react';
import { Group, List, Cell, Avatar, Button } from '@vkontakte/vkui';

const EventList = ({ events, title, go, active }) => {
	const [eventCells, setEventCells] = useState([]);

	useEffect(() => {
		setEventCells(events && events.response && events.response.map(item => {
			return (
				<Cell onClick={go} data-to="event" data-event={JSON.stringify({...item, active})}
					before={<Avatar src={item.photo_100} />} description={item.activity}
					asideContent={active ? <Button onClick={alert} >Записаться</Button> : null} >
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