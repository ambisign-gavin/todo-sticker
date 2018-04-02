// @flow
import React from 'react';
import './sortButton.scss';
import { Menu, Dropdown } from 'antd';
import Translate from '../../class/translate';

type Props = {
    sortType: string
}

export default class SortButton extends React.Component<Props> {
    render() {
        let {
            sortType,
            ...others
        } = this.props;
        sortType;

        let menu = (
            <Menu>
                <Menu.Item key="0">
                    <a>{Translate.tr('Due Date')}</a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a>{Translate.tr('Create Time')}</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div {...others} >
                <p style={{display: 'inline'}} > Sort By </p>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a>Click me</a>
                </Dropdown>
                <span className="sort-icon glyphicon glyphicon-sort-by-order"></span>
            </div>
        );
    }
}
