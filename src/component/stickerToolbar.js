// @flow
import React from 'react';
import styled from 'styled-components';
import stickerDispatcher from '../sticker/dispatcher';
import { closeStickerWindow, minimizeStickerWindow, maximizeStickerWindow } from '../sticker/action';

const StickerToolBar = () => {
    return (
        <Container>
            <ToolButton
                onClick={() => stickerDispatcher.dispatch(minimizeStickerWindow())}
                className='far fa-window-minimize'
            />
            <ToolButton
                onClick={() => stickerDispatcher.dispatch(maximizeStickerWindow())}
                className='far fa-window-maximize'
            />
            <ToolButton
                onClick={() => stickerDispatcher.dispatch(closeStickerWindow())}
                className='far fa-window-close'
            />
        </Container>
    );
};

export default StickerToolBar;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0 10px;
`;

const ToolButton = styled.span`
    -webkit-app-region: no-drag;
    text-align: center;
    margin-top: 5px;
    margin-right: 20px;
    cursor: pointer;
`;

ToolButton.displayName='ToolButton';