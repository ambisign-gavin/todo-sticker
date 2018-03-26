
import React from 'react';
import AddEventContainer from '../../container/addEventContainer';
import './app.scss';


export default class App extends React.Component {

    render() {
        return (
            <div>
                App
                <AddEventContainer className="float-right-btn" />
            </div>
        );
    }
}
