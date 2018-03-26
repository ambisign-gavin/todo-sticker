
import React from 'react';
import AddButton from '../addButton/addButton';
import './app.scss';


export default class App extends React.Component {

    render() {
        return (
            <div>
                App
                <AddButton className="float-right-btn" />
            </div>
        );
    }
}
