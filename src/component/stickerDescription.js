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

export default class StickerDescription extends React.Component<Props, States> {

    state = {
        description: '',
    }

    constructor(props: Props) {
        super(props);
    }
    
    componentWillMount() {
        ipcRenderer.on(IpcChannels.editSticker, this._handleEditSticker.bind(this));
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(IpcChannels.editSticker, this._handleEditSticker.bind(this));
    }

    _handleEditSticker(event: any, description: string) {
        this.setState({
            description: description,
        });
    }

    render() {
        return (
            <StickerDescriptionDiv>{this.state.description}</StickerDescriptionDiv>
        );
    }

}

const StickerDescriptionDiv = styled.div`
    white-space: pre-line;
    padding: 20px 15px;
`;