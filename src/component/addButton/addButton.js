// @flow
import React from 'react';
import Translate from '../../class/translate';
import AddModal from '../../container/addTodoModalContainer';
import './addButton.scss';

type Props = {
}

type States = {
    showEditModal: boolean,
    defaultTimestamp: number
}

export default class AddButton extends React.Component<Props, States> {
    handleOpenModal: Function;
    handleCloseModal: Function;
    handleOkModal: Function;

    state = {
        showEditModal: false,
        defaultTimestamp: new Date().getTime()
    };

    constructor(props: Props) {
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOkModal = this.handleOkModal.bind(this);
    }

    handleOkModal() {
        this.setState({ showEditModal: false });
    }

    handleOpenModal() {
        this.setState({
            showEditModal: true,
            defaultTimestamp: new Date().getTime()
        });
    }

    handleCloseModal() {
        this.setState({ showEditModal: false });
    }

    render() {

        return (
            <div {...this.props}>
                <div onClick={this.handleOpenModal}>
                    <span className="glyphicon glyphicon-plus-sign add-icon"></span>
                </div>
                <AddModal
                    onSave={this.handleOkModal}
                    onCancel={this.handleCloseModal}
                    title={Translate.tr('Add Event')}
                    visible={this.state.showEditModal}
                    defaultDueDatetime={this.state.defaultTimestamp}
                    defaultDescription={''}
                />
            </div>
        );
    }
}
