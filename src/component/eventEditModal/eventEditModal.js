// @flow
import { Modal, DatePicker, TimePicker, Input } from 'antd';
import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Translate from '../../class/translate';

export type EditInfo = {
    date: number,
    time: number,
    description: string
}

type Props = {
    visible: boolean,
    title: string,
    defaultDate?: number,
    defaultTime?: number,
    defaultDescriptin?: string,
    onSave?: (editInfo: EditInfo) => void
}

type States = {
    date: number,
    time: number,
    desctiption: string
}

export default class EditModal extends React.Component<Props, States> {

    handleDateChanged: Function;
    handleTimeChanged: Function;
    handleDescriptionChanged: Function;
    handleOk: Function;

    static defaultProps = {
        visible: false,
        defaultDate: new Date().getTime(),
        defaultTime: new Date().getTime(),
        defaultDescriptin: '',
    }

    constructor(props: Props) {
        super(props);
        moment.locale('en');
        this.handleDateChanged = this.handleDateChanged.bind(this);
        this.handleTimeChanged = this.handleTimeChanged.bind(this);
        this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this);
        this.handleOk = this.handleOk.bind(this);
        
        this.state = {
            date: props.defaultDate? props.defaultDate: new Date().getTime(),
            time: props.defaultTime? props.defaultTime: new Date().getTime(),
            desctiption: ''
        };
    }
    
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.defaultDate && nextProps.defaultDate !== this.props.defaultDate) {
            this.setState({date: nextProps.defaultDate});
        }
        if (nextProps.defaultTime && nextProps.defaultTime !== this.props.defaultTime) {
            this.setState({time: nextProps.defaultTime});
        }
        return true;
    }

    handleDateChanged(dates: moment) {
        this.setState(
            {
                date: dates.toDate().getTime()
            }
        );
    }

    handleTimeChanged(time: moment) {
        this.setState(
            {
                time: time.toDate().getTime()
            }
        );
    }

    handleDescriptionChanged(event: SyntheticEvent<HTMLTextAreaElement>) {
        let descriptin = event.currentTarget.value;
        this.setState({
            desctiption: descriptin
        });
    }

    handleOk() {
        if (!this.props.onSave) {
            return;
        }
        let editInfo: EditInfo;
        editInfo = {
            date: this.state.date,
            time: this.state.time,
            description: this.state.desctiption
        };
        this.props.onSave(editInfo);
    }

    render() {
        var {
            defaultDate,
            defaultTime,
            defaultDescriptin,
            ...others
        } = this.props;

        return (
            <Modal destroyOnClose={true} onOk={this.handleOk} {...others} >
                <p>{Translate.tr('notificationDate')}</p>
                <DatePicker onChange={this.handleDateChanged} defaultValue={moment(defaultDate)} />
                <p>{Translate.tr('notificationTime')}</p>
                <TimePicker onChange={this.handleTimeChanged} defaultValue={moment(defaultTime)} format={'HH:mm'} />
                <p>{Translate.tr('eventDescription')}</p>
                <Input.TextArea defaultValue={defaultDescriptin} onChange={this.handleDescriptionChanged} rows={4} />
            </Modal>
        );
    }
}
