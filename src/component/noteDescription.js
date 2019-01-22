// @flow
import React from 'react';
import { ipcRenderer } from 'electron';
import { IpcChannels } from '../sticker/channel';
import styled from 'styled-components';

type Props = {

};

type States = {
    description: string,
};

export default class NoteDescription extends React.Component<Props, States> {

    state = {
        description: '',
    }

    constructor(props: Props) {
        super(props);
    }
    
    componentWillMount() {
        ipcRenderer.on(IpcChannels.noteDescriptionSend, this._handleNoteDescriptionSended.bind(this));
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(IpcChannels.noteDescriptionSend, this._handleNoteDescriptionSended.bind(this));
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