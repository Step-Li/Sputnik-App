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
    const user = {
        last_name: data.last_name, first_name: data.first_name, father_name: '',
        bdate: data.bdate, sex: data.sex,
        email: '', phone: '',
        occupation: '', specialty: '', languages: '',
        volExp: '', childExp: '', extraSkills: '',
        expects: '', medContrad: '', foodPref: '',
        infoSource: '', size: ''
    };
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const texts = [{name: 'volExp', text: 'Опыт волонтёрской деятельности'},
        {name: 'childExp',text: 'Опыт работы с детьми'},
        {name: 'extraSkills',text: 'Дополнительные навыки'},
        {name: 'expects',text: 'Ожидания'},
        {name: 'medContrad',text: 'Медицинские противопоказания'},
        {name: 'foodPref',text: 'Предпочтения в еде'},
        {name: 'infoSource',text: 'Откуда Вы о нас узнали?'}];

    useEffect(() => {
        async function fetchData() {
            const phone= await connect.sendPromise('VKWebAppGetPhoneNumber');
            const email = await connect.sendPromise('VKWebAppGetEmail');
            setPhone(phone);
            setEmail(email);
        }
        fetchData();
    }, []);

    const handleClick = () => {

    };

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        user[name] = value;
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
                <FormLayout name='new-volunteer'>
                    <Input top="Фамилия" name='last_name'
                           onChange={() => onChange()}
                           value={user.last_name}
                    />
                    <Input top="Имя" name='first_name'
                           onChange={() => onChange()}
                           value={user.first_name}
                    />
                    <Input top="Отчество" name='father_name'
                           onChange={() => onChange()}
                           value={user.father_name}
                    />
                    <Input top="Дата рождения" name='bdate'
                           onChange={() => onChange()}
                           value={user.bdate}
                    />

                    <Select top="Пол" placeholder="Выберите пол" name="sex"
                            value={user.sex === 2 ? 'm' :(user.sex === 1 ? 'f' : null)}
                            onChange={() => onChange()}
                    >
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    <Input type="email" top="E-mail" name="email"
                           onChange={() => onChange()}
                           name="email" value={email.email}
                    />

                    <Input top='Телефон' name="phone"
                           onChange={() => onChange()}
                           value={phone.phone_number}
                    />

                    <Input top='Место учёбы/работы' name="occupation"
                           onChange={() => onChange()}
                           value={user.occupation}
                    />
                    <Input top='Специальность' name="specialty"
                           onChange={() => onChange()}
                           value={user.specialty}
                    />
                    <Input top='Языки' name="languages"
                           onChange={() => onChange()}
                           value={user.languages}
                    />

                    {texts.map(({name, text}) => (
                        <Textarea name={name} key={name} top={text}
                                  onChange={() => onChange()}
                                  value={user[name]}
                        />
                    ))}



                    <Select top="Размер одежды" placeholder="Выберите размер одежды"
                            onChange={() => onChange()}
                            value={user.size}
                    >
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                    </Select>

                    <Checkbox>Согласны ли Вы на получение рассылки?</Checkbox>

                    <Button size="xl" onClick={handleClick()}>Отправить анкету</Button>
                </FormLayout>
            </Panel>
        );
};

export default Questionnaire;