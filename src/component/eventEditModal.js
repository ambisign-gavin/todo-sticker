// @flow
import { Modal, DatePicker, TimePicker, Input } from 'antd';
import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Translate from '../class/translate';
import type {TodoState} from '../states';

type Props = {
    visible: boolean,
    title: string,
    todoId?: string,
    defaultDueDatetime?: number,
    defaultDescription?: string,
    handleAddEvent?: (eventState: TodoState) => void,
    handleEditEvent?: (eventState: TodoState) => void,
    onSave?: () => void,
}

type States = {
    dueDatetime: number,
    desctiption: string
}

export default class EditModal extends React.Component<Props, States> {

    handleDateChanged: Function;
    handleTimeChanged: Function;
    handleDescriptionChanged: Function;
    handleOk: Function;

    static defaultProps = {
        visible: false,
        defaultDescriptin: '',
    }

    state = {
        dueDatetime: this.props.defaultDueDatetime || new Date().getTime(),
        desctiption: this.props.defaultDescription || '',
    };

    constructor(props: Props) {
        super(props);
        moment.locale('en');
        this.handleDateChanged = this.handleDateChanged.bind(this);
        this.handleTimeChanged = this.handleTimeChanged.bind(this);
        this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.defaultDueDatetime && nextProps.defaultDueDatetime !== this.props.defaultDueDatetime) {
            this.setState({dueDatetime: nextProps.defaultDueDatetime});
        }
        if (nextProps.defaultDescription && nextProps.defaultDescription !== this.props.defaultDescription) {
            this.setState({desctiption: nextProps.defaultDescription});
        }
        return true;
    }

    handleDateChanged(dates: moment) {
        let dueDate = new Date(this.state.dueDatetime);
        dueDate.setUTCFullYear(dates.utc().get('year'));
        dueDate.setUTCMonth(dates.utc().get('month'));
        dueDate.setUTCDate(dates.utc().get('date'));
        
        this.setState({
            dueDatetime: dueDate.getTime()
        });
    }

    handleTimeChanged(time: moment) {
        let dueDatetime = new Date(this.state.dueDatetime);
        dueDatetime.setUTCHours(time.utc().get('hour'));
        dueDatetime.setUTCMinutes(time.utc().get('minute'));

        this.setState({
            dueDatetime: dueDatetime.getTime()
        });
    }

    handleDescriptionChanged(event: SyntheticEvent<HTMLTextAreaElement>) {
        let descriptin = event.currentTarget.value;
        this.setState({
            desctiption: descriptin
        });
    }

    handleOk() {
        // set seconds to 00
        let dueDatetime = new Date(this.state.dueDatetime);
        dueDatetime.setUTCSeconds(0);
        
        let todoState: TodoState = {
            description: this.state.desctiption,
            dueDatetime: dueDatetime.getTime()
        };
        if (this.props.handleAddEvent) {
            this.props.handleAddEvent(todoState);
        }
        if (this.props.handleEditEvent) {
            todoState.id = this.props.todoId || '';
            this.props.handleEditEvent(todoState);
        }

        if (this.props.onSave) {
            this.props.onSave();
        }

    }

    render() {
        const {
            defaultDueDatetime,
            defaultDescription,
            ...others
        } = this.props;
        
        return (
            <Modal destroyOnClose={true} onOk={this.handleOk} {...others} >
                <p>{Translate.tr('Due date')}</p>
                <DatePicker allowClear={false} onChange={this.handleDateChanged} defaultValue={moment(defaultDueDatetime)} />
                &nbsp;
                <TimePicker allowEmpty={false} onChange={this.handleTimeChanged} defaultValue={moment(defaultDueDatetime)} format={'HH:mm'} />
                <p>{Translate.tr('eventDescription')}</p>
                <Input.TextArea defaultValue={defaultDescription} onChange={this.handleDescriptionChanged} rows={4} />
            </Modal>
        );
    }
}
