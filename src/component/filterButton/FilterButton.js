// @flow
import React from 'react';
import { Button } from 'antd';
import Translate from '../../class/translate';
import FilterPanelContainer from '../../container/FilterPanelContainer';

type Props = {

}

type States = {
    showPanel: boolean,
}

export default class FilterButton extends React.Component<Props, States> {

    state: States = {
        showPanel: false,
    }

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props}>
                <Button onClick={() => this.setState({showPanel: !this.state.showPanel})} >{Translate.tr('filter')}</Button>
                <FilterPanelContainer show={this.state.showPanel} />
            </div>
        );
    }
}
