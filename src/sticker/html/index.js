// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import StickerDescription from '../../component/stickerDescription';
import { injectGlobal } from 'styled-components';
import StickerToolBar from '../../component/stickerToolbar';

const app = document.getElementById('app');

function renderToolBarIfOnWindows() {
    console.log('process.platform', process.platform);
    
    if (/^win/i.test(process.platform)) {
        return (
            <StickerToolBar />
        );
    }
}

export const Sticker = () => {
    return (
        <div>
            {renderToolBarIfOnWindows()}
            <StickerDescription />
        </div>
    );
};

app && ReactDOM.render(
    <Sticker />,
    app
);

injectGlobal`
    body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        background-color: #f7f7a3;
        overflow-wrap: break-word;
        overflow-x: hidden;
        -webkit-user-select: none;
        -webkit-app-region: drag;
    }
`;


