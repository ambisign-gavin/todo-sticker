// @flow
import React from 'react';
import Translate from '../class/translate';
import AddModal from '../container/addTodoModalContainer';
import styled from 'styled-components';

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
                <AddButtonIcon onClick={this.handleOpenModal}>
                    <span className="glyphicon glyphicon-plus-sign"></span>
                </AddButtonIcon>
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

const AddButtonIcon = styled.div`
    font-size: 38px !important;
    cursor: pointer;
    
    &:hover {
        color: #6494c4;
    }
`;
AddButtonIcon.displayName = 'AddButtonIcon';