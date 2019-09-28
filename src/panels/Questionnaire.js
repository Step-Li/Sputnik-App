import React, { useState, useEffect }  from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {
    platform,
    Button,
    Checkbox,
    FormLayout,
    HeaderButton,
    Input, IOS,
    Panel,
    PanelHeader,
    Select,
    Textarea
} from "@vkontakte/vkui";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import connect from "@vkontakte/vk-connect";

const osName = platform();

const Questionnaire = ({id, go, data}) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function fetchData() {
            const phone= await connect.sendPromise('VKWebAppGetPhoneNumber');
            const email = await connect.sendPromise('VKWebAppGetEmail');
            setPhone(phone);
            setEmail(email);
        }
        fetchData();
    }, []);

    return (
            <Panel id={id} theme="white">
                <PanelHeader
                    left={<HeaderButton onClick={go} data-to="home">
                        {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                    </HeaderButton>}
                >
                    Анкета волонтёра
                </PanelHeader>
                <FormLayout>
                    <Input top="Фамилия" name='last_name'
                           defaultValue={data.last_name}
                    />
                    <Input top="Имя" name='first_name'
                           defaultValue={data.first_name}
                    />
                    <Input top="Отчество" name='first_name' />
                    <Input top="Дата рождения" name='birth_date'
                           defaultValue={data.bdate}
                    />

                    <Select top="Пол" placeholder="Выберите пол"
                            defaultValue={data.sex === 2 ? 'm' :(data.sex === 1 ? 'f' : null)}
                    >
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    <Input
                        type="email"
                        top="E-mail"
                        name="email"
                        defaultValue={email.email}
                    />

                    <Input top='Телефон' defaultValue={phone.phone_number}/>

                    <Input top='Место учёбы/работы'/>
                    <Input top='Специальность'/>
                    <Input top='Языки' />

                    <Textarea top='Опыт волонтёрской деятельности'/>
                    <Textarea top='Опыт работы с детьми'/>
                    <Textarea top='Дополнительные навыки'/>
                    <Textarea top='Ожидания'/>
                    <Textarea top='Медицинские противопоказания'/>
                    <Textarea top='Предпочтения в еде'/>
                    <Textarea top='Откуда Вы о нас узнали?' />

                    <Select top="Размер одежды" placeholder="Выберите размер одежды">
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                    </Select>

                    <Checkbox>Согласны ли Вы на получение рассылки?</Checkbox>

                    <Button size="xl">Отправить анкету</Button>
                </FormLayout>
            </Panel>
        );
};

export default Questionnaire;