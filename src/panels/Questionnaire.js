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

const Questionnaire = ({id, go, data, alert}) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const user = {
        last_name: data.last_name, first_name: data.first_name, father_name: '',
        bdate: data.bdate, sex: data.sex === 2 ? '2' :(data.sex === 1 ? '1' : '0'),
        email: '', phone: '',
        occupation: '', specialty: '', languages: '',
        volExp: '', childExp: '', extraSkills: '',
        expects: '', medContrad: '', foodPref: '',
        infoSource: '', size: '', isAgree: "off"
    };

    const texts = [{name: 'volExp', text: 'Опыт волонтёрской деятельности'},
        {name: 'museum', text: 'Ваш музей'},
        {name: 'childExp',text: 'Опыт работы с детьми'},
        {name: 'extraSkills',text: 'Дополнительные навыки'},
        {name: 'expects',text: 'Ожидания'},
        {name: 'medContrad',text: 'Медицинские противопоказания'},
        {name: 'foodPref',text: 'Предпочтения в еде'},
        {name: 'infoSource',text: 'Откуда Вы о нас узнали?'}];

    useEffect(() => {
        async function fetchData() {
            const phone = await connect.sendPromise('VKWebAppGetPhoneNumber');
            const email = await connect.sendPromise('VKWebAppGetEmail');
            setPhone(phone);
            setEmail(email);
        }
        fetchData();
    }, []);

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        user[name] = value;
    };

    async function sendData() {
        const resp = await fetch(
            `https://demo11.alpha.vkhackathon.com:433/api/user/setProfile?auth=oX5n!E2i.VpWpHeo8E6F0q
&vk_id=${data.id}&surname=${user.last_name}&first_name=${user.first_name}
&second_name=${user.father_name}&birthday=${user.bdate}&sex=${user.sex}&museum=${user.museum}
&email=${user.email ? user.email : email.email}&phone=${user.phone ? user.phone : phone.phone_number}
&occupation=${user.occupation}&langs=${user.languages}&volunteer_experience=${user.volExp}
&children_work_experience=${user.childExp}
&skills=${user.extraSkills}&expectations=${user.expects}
&medical_contraindications=${user.medContrad}&specialty=${user.specialty}
&food_preferences=${user.foodPref}&clothes_size=${user.size}
&information_source=${user.infoSource}
&mailing_agreement=${user.isAgree === "on" ? "true" : "false"}`,
            {mode: "cors"});
        const json = await resp.json();
        if(json.success) {
            alert("Сохранено");
        } else {
            alert("Ошибка, попробуйте снова");
        }
    }

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
                           onChange={onChange}
                           defaultValue={user.last_name}
                    />
                    <Input top="Имя" name='first_name'
                           onChange={onChange}
                           defaultValue={user.first_name}
                    />
                    <Input top="Отчество" name='father_name'
                           onChange={onChange}
                           defaultValue={user.father_name}
                    />
                    <Input top="Дата рождения" name='bdate'
                           onChange={onChange}
                           defaultValue={user.bdate}
                    />

                    <Select top="Пол" placeholder="Выберите пол" name="sex"
                            defaultValue={user.sex}
                            onChange={onChange}
                    >
                        <option value="2">Мужской</option>
                        <option value="1">Женский</option>
                    </Select>

                    <Input type="email" top="E-mail" name="email"
                           onChange={onChange}
                           defaultValue={email.email}
                    />

                    <Input type="tel" top='Телефон' name="phone"
                           onChange={onChange}
                           defaultValue={phone.phone_number}
                    />

                    <Input top='Место учёбы/работы' name="occupation"
                           onChange={onChange}
                           defaultValue={user.occupation}
                    />
                    <Input top='Специальность' name="specialty"
                           onChange={onChange}
                           defaultValue={user.specialty}
                    />
                    <Input top='Языки' name="languages"
                           onChange={onChange}
                           defaultValue={user.languages}
                    />

                    {texts.map(({name, text}) => (
                        <Textarea name={name} key={name} top={text}
                                  onChange={onChange}
                                  defaultValue={user[name]}
                        />
                    ))}

                    <Select top="Размер одежды" placeholder="Выберите размер одежды"
                            name="size"
                            onChange={onChange}
                            defaultValue={user.size}
                    >
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                    </Select>

                    <Checkbox name="isAgree"
                              onChange={onChange}
                    >
                        Согласны ли Вы на получение рассылки?
                    </Checkbox>

                    <Button size="xl" onClick={(event) => {sendData(); go(event)}}
                            data-to="home">
                        Отправить анкету
                    </Button>
                </FormLayout>
            </Panel>
        );
};

export default Questionnaire;