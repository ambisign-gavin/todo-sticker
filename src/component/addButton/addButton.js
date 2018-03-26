// @flow
import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditModal from '../eventEditModal/eventEditModal';
import type { EditInfo } from '../eventEditModal/eventEditModal';
import Translate from '../../class/translate';

type Props = {
    handleAddEvent: (descrtiption: string) => void
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

    handleOpenModal() {
        this.setState({
            showEditModal: true,
            defaultTimestamp: new Date().getTime()
        });
    }

    handleCloseModal() {
        this.setState({ showEditModal: false });
    }

    handleOkModal(editInfo: EditInfo) {
        console.log(editInfo.desctiption);
        this.props.handleAddEvent(editInfo.desctiption);
    }

    render() {
        var {
            handleAddEvent,
            ...other
        } = this.props;
        handleAddEvent; // no need to pass to chuld

        return (
            <div>
                <Button onClick={this.handleOpenModal} variant="fab" color="primary" aria-label="add" {...other}  >
                    <AddIcon />
                </Button>
                <EditModal
                    onSave={this.handleOkModal}
                    onCancel={this.handleCloseModal}
                    title={Translate.tr('Add Event')}
                    visible={this.state.showEditModal}
                    defaultDate={this.state.defaultTimestamp}
                    defaultTime={this.state.defaultTimestamp}
                    defaultDescriptin={''}
                />
            </div>
        );
    }
}
