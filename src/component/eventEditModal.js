// @flow
import { Modal, DatePicker, TimePicker, Input } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Translate from '../class/translate';
import type {TodoState} from '../states';

type Props = {
    title: string,
    todoState?: TodoState,
    onSave: (newTodoState: TodoState) => void,
}

type States = {
    todoState: TodoState,
    visible: boolean,
}

export default class EditModal extends React.Component<Props, States> {

    static defaultProps = {
        visible: false,
        defaultDescriptin: '',
    }

    constructor(props: Props) {
        super(props);

        let defaultDate = new Date();
        defaultDate.setUTCSeconds(0);

        const {
            todoState = {
                dueDatetime: defaultDate.getTime(),
                description: ''
            }
        } = this.props;

        this.state = {
            todoState,
            visible: true,
        };
    }

    _handleDateChanged(dates: moment) {
        let {
            todoState
        } = this.state;

        let dueDatetime = moment(todoState.dueDatetime);
        dueDatetime.set('year', dates.get('year'));
        dueDatetime.set('month', dates.get('month'));
        dueDatetime.set('date', dates.get('date'));
        todoState.dueDatetime = dueDatetime.toDate().getTime();

        this.setState({
            todoState
        });
    }

    _handleTimeChanged(time: moment) {
        let {
            todoState
        } = this.state;

        let dueDatetime = moment(todoState.dueDatetime);
        dueDatetime.set('hour', time.get('hour'));
        dueDatetime.set('minute', time.get('minute'));
        todoState.dueDatetime = dueDatetime.toDate().getTime();

        this.setState({
            todoState
        });
    }

    _handleDescriptionChanged(event: SyntheticEvent<HTMLTextAreaElement>) {
        let {
            todoState
        } = this.state;
        todoState.description = event.currentTarget.value;

        this.setState({
            todoState
        });
    }

    _handleOk() {
        this.props.onSave(this.state.todoState);
        this.setState({
            visible: false,
        });
    }

    _handleCancel() {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {
            onSave,
            title,
            // onClose,
            ...others
        } = this.props;

        const {
            todoState
        } = this.state;

        return (
            <Modal
                {...others}
                title={title}
                destroyOnClose={true}
                onOk={this._handleOk.bind(this)}
                onCancel={this._handleCancel.bind(this)}
                visible={this.state.visible}
            >
                <p>{Translate.tr('Due date')}</p>
                <DatePicker 
                    allowClear={false}
                    onChange={this._handleDateChanged.bind(this)}
                    defaultValue={moment(todoState.dueDatetime)}
                />
                &nbsp;
                <TimePicker
                    allowEmpty={false}
                    onChange={this._handleTimeChanged.bind(this)}
                    defaultValue={moment(todoState.dueDatetime)}
                    format={'HH:mm'}
                />
                <p>{Translate.tr('eventDescription')}</p>
                <Input.TextArea
                    defaultValue={todoState.description}
                    onChange={this._handleDescriptionChanged.bind(this)}
                    rows={4}
                />
            </Modal>
        );
    }
}

export const TodoEditableModal = {
    show(props: Props) {
        let wrapper = document.getElementById('todoModal');
        if (!wrapper) {
            return;
        }

        let cleanup = () => {
            ReactDOM.unmountComponentAtNode(wrapper);
        };

        ReactDOM.render(
            <EditModal
                {...props}
                afterClose={cleanup}
            />
            , wrapper
        );
    }
};