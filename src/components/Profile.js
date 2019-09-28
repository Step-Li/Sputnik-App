import React, { useState, useEffect } from 'react';
import { Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Profile = ({ fetchedUser, go}) => {
    const [rating, setRating] = useState(0);

	useEffect(() => {
        async function getRating() {
            const resp = await fetch(`https://demo11.alpha.vkhackathon.com:433/api/user/getRating?auth=oX5n!E2i.VpWpHeo8E6F0q`, {
                mode: "cors"
            });

            const rating = await resp.json();

		    setRating(rating.user_rating);
        }

        getRating();
    }, []);

	return (
		<Group title="Мой профиль" onClick={go} data-to="new-user">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                asideContent={<Div>Рейтинг: { rating }</Div>}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>
	);
};

export default Profile;