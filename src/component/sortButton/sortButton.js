// @flow
import React from 'react';
import './sortButton.scss';
import { Menu, Dropdown } from 'antd';
import Translate from '../../class/translate';
import {SortColumnEnum, SortByTypeEnum} from '../../constant/sort';
import type {SortColumn, SortByType} from '../../constant/sort';
import Classnames from 'classnames';

type Props = {
    sortColumn: SortColumn,
    sortByType: SortByType,
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
        let sortByIconClass= Classnames({
            'sort-icon': true,
            'glyphicon': true,
            'glyphicon-sort-by-order': this.props.sortByType === SortByTypeEnum.asc,
            'glyphicon-sort-by-order-alt': this.props.sortByType === SortByTypeEnum.desc,
        });

        let {
            sortColumn,
            sortByType,
            handleSortColumnSelected,
            ...others
        } = this.props;
        
        sortColumn;
        sortByType;
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
                    <a>{this.props.sortColumn}</a>
                </Dropdown>
                <span className={sortByIconClass}></span>
            </div>
        );
    }
}
