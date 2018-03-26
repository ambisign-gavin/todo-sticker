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
    showEditModal: boolean
}

export default class AddButton extends React.Component<Props, States> {
    handleOpenModal: Function;
    handleCloseModal: Function;
    handleOkModal: Function;

    constructor(props: Props) {
        super(props);
        this.state = {
            showEditModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOkModal = this.handleOkModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showEditModal: true });
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

        let defaultTimestamp = new Date().getTime();

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
                    defaultDate={defaultTimestamp}
                    defaultTime={defaultTimestamp}
                    defaultDescriptin={''}
                />
            </div>
        );
    }
}
