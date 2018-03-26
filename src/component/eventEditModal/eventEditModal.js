// @flow
import {Modal, DatePicker, TimePicker, Input} from 'antd';
import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Translate from'../../class/translate';

type Props = {
    visible: boolean,
    title: string
}

export default class EditModal extends React.Component<Props> {

    static defaultProps = {
        visible: false
    }

    constructor(props: Props) {
        super(props);
        moment.locale('zh-cn');
    }

    render() {
        return (
            <Modal {...this.props} >
                <p>{Translate.tr('notificationDate')}</p>
                <DatePicker defaultValue={moment()}/>
                <p>{Translate.tr('notificationTime')}</p>
                <TimePicker defaultValue={moment()} format={'HH:mm'} />
                <p>{Translate.tr('eventDescription')}</p>
                <Input.TextArea rows={4} />
            </Modal>
        );
    }
}
