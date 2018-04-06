// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import { IpcChannels } from '../ipc/channel';

type Props = {

};

type States = {
    description: string,
};

class NoteDescription extends React.Component<Props, States> {

    _handleNoteDescriptionSended: Function;

    state = {
        description: '',
    }

    constructor(props: Props) {
        super(props);
        this._handleNoteDescriptionSended = this._handleNoteDescriptionSended.bind(this);
    }
    
    componentWillMount() {
        ipcRenderer.on(IpcChannels.noteDescriptionSend, this._handleNoteDescriptionSended);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(IpcChannels.noteDescriptionSend, this._handleNoteDescriptionSended);
    }

    _handleNoteDescriptionSended(event: any, nodeDescription: string) {
        this.setState({
            description: nodeDescription,
        });
    }

    render() {
        return (
            <div>{this.state.description}</div>
        );
    }

}

ReactDOM.render(
    <NoteDescription />
    , document.getElementById('app')
);

