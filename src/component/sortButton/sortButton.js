// @flow
import React from 'react';
import './sortButton.scss';
import { Menu, Dropdown } from 'antd';
import Translate from '../../class/translate';
import {SortColumnEnum} from '../../constant/sort';
import type {SortColumn} from '../../constant/sort';

type Props = {
    sortType: string,
    handleSortColumnSelected: (column: SortColumn) => void
}

export default class SortButton extends React.Component<Props> {

    onSortColumnSelected: Function;

    constructor(props: Props) {
        super(props);
        this.onSortColumnSelected = this.onSortColumnSelected.bind(this);
    }

    onSortColumnSelected(selectedMenu: any) {
        this.props.handleSortColumnSelected(selectedMenu.key);
    }

    render() {
        let {
            sortType,
            handleSortColumnSelected,
            ...others
        } = this.props;
        sortType;
        handleSortColumnSelected;

        let menu = (
            <Menu onClick={this.onSortColumnSelected} >
                <Menu.Item key={SortColumnEnum.dueDate}>
                    <a>{Translate.tr('Due Date')}</a>
                </Menu.Item>
                <Menu.Item key={SortColumnEnum.createTime}>
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
