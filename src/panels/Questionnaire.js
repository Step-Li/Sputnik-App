import React from 'react';
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

const osName = platform();

const Questionnaire = ({id, go}) => {
        const state = {
            last_name: 'Тимохов',
            first_name: 'Виктор',
            father_name: 'Викторович',
            birth_date: '20 июня 1999',
            sex: 'm',
            email: 'viktor-timohov@mail.ru',
            phone: '+79113350200',
            occupation: 'СПбГУ',
            languages: ['Русский', 'English', 'Svenska']
        };

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
                           defaultValue={state.last_name}
                    />
                    <Input top="Имя" name='first_name'
                           defaultValue={state.first_name}
                    />
                    <Input top="Отчество" name='first_name'
                           defaultValue={state.father_name}
                    />
                    <Input top="Дата рождения" name='birth_date'
                           defaultValue={state.birth_date}
                    />

                    <Select top="Пол" placeholder="Выберите пол" defaultValue='m'>
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    <Input
                        type="email"
                        top="E-mail"
                        name="email"
                        defaultValue={state.email}
                    />

                    <Input top='Телефон' defaultValue={state.phone}/>

                    <Input top='Место учёбы/работы' defaultValue={state.occupation}/>
                    <Input top='Специальность'/>
                    <Input top='Языки' defaultValue={state.languages.join(', ')}/>

                    <Textarea top='Опыт волонтёрской деятельности'/>
                    <Textarea top='Опыт работы с детьми'/>
                    <Textarea top='Дополнительные навыки'/>
                    <Textarea top='Ожидания'/>
                    <Textarea top='Медицинские противопоказания'/>
                    <Textarea top='Предпочтения в еде'/>
                    <Textarea top='Откуда Вы о нас узнали?'/>

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
}

export default Questionnaire;