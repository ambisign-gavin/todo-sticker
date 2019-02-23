// @flow
import React from 'react';
import styled from 'styled-components';

const StickerToolBar = () => {
    return (
        <Container>
            <ToolButton className="far fa-window-minimize"/>
            <ToolButton className="far fa-window-maximize"/>
            <ToolButton className="far fa-window-close"/>
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
    text-align: center;
    margin-top: 5px;
    margin-right: 20px;
    cursor: pointer;
`;