import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditModal from '../eventEditModal/eventEditModal';

export default class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false
        };
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleAddEvent() {
        this.setState({showEditModal: true});
    }

    handleCloseModal() {
        this.setState({showEditModal: false});
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleAddEvent} variant="fab" color="primary" aria-label="add" {...this.props} >
                    <AddIcon />
                </Button>
                <EditModal onCancel={this.handleCloseModal} title={'ed'} visible={this.state.showEditModal} />
            </div>
        );
    }
}
