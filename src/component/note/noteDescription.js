// @flow
import React from 'react';
import { ipcRenderer } from 'electron';
import { IpcChannels } from '../../ipc/channel';
import styled from 'styled-components';

type Props = {

};

type States = {
    description: string,
};

export default class NoteDescription extends React.Component<Props, States> {

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
            <NoteDescriptionDiv>{this.state.description}</NoteDescriptionDiv>
        );
    }

}

const NoteDescriptionDiv = styled.div`
    white-space: pre-line;
    padding: 20px 15px;
`;