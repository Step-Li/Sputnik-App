import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {Button, Checkbox, FormLayout, Input, Panel, PanelHeader, Select, Textarea, View} from "@vkontakte/vkui";

class Questionnaire extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last_name: 'Тимохов',
            first_name: 'Виктор',
            father_name: 'Викторович',
            birth_date: '20 июня 1999',
            sex: 'm',
            email: 'viktor-timohov@mail.ru',
            phone: '+79113350200',
            occupation: 'СПбГУ',
            languages: ['Русский', 'English', 'Svenska']
        }
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    handleClick(e) {

    }

    render() {
        return (
            <Panel id="new-user" theme="white">
                <PanelHeader>Анкета волонтёра</PanelHeader>
                <FormLayout>
                    <Input top="Фамилия" name='last_name'
                           defaultValue={this.state.last_name}
                           onChange={this.onChange}
                    />
                    <Input top="Имя" name='first_name'
                           defaultValue={this.state.first_name}
                           onChange={this.onChange}
                    />
                    <Input top="Отчество" name='first_name'
                           defaultValue={this.state.father_name}
                           onChange={this.onChange}
                    />
                    <Input top="Дата рождения" name='birth_date'
                           defaultValue={this.state.birth_date}
                           onChange={this.onChange}
                    />

                    <Select top="Пол" placeholder="Выберите пол" defaultValue='m'>
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    <Input
                        type="email"
                        top="E-mail"
                        name="email"
                        defaultValue={this.state.email}
                    />

                    <Input top='Телефон' defaultValue={this.state.phone}/>

                    <Input top='Место учёбы/работы' defaultValue={this.state.occupation}/>
                    <Input top='Специальность'/>
                    <Input top='Языки' defaultValue={this.state.languages.join(', ')}/>

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
}

export default Questionnaire;