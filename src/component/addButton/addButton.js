// @flow
import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Translate from '../../class/translate';
import AddModal from '../../container/addTodoModalContainer';

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
            <div>
                <Button onClick={this.handleOpenModal} variant="fab" color="primary" aria-label="add" {...this.props}  >
                    <AddIcon />
                </Button>
                <AddModal
                    onSave={this.handleOkModal}
                    onCancel={this.handleCloseModal}
                    title={Translate.tr('Add Event')}
                    visible={this.state.showEditModal}
                    defaultDate={this.state.defaultTimestamp}
                    defaultTime={this.state.defaultTimestamp}
                    defaultDescription={''}
                />
            </div>
        );
    }
}
