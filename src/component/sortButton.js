// @flow
import React from 'react';
import { Menu, Dropdown } from 'antd';
import Translate from '../class/translate';
import {SortColumnEnum, SortByTypeEnum} from '../constant/sort';
import type {SortColumn, SortByType} from '../constant/sort';
import Classnames from 'classnames';
import styled from 'styled-components';

type Props = {
    sortColumn: SortColumn,
    sortByType: SortByType,
    handleSortColumnSelected: (column: SortColumn) => void,
    handleSortByChanged: (sortBy: SortByType) => void,
}

export default class SortButton extends React.Component<Props> {

    onSortColumnSelected: Function;
    onSortByChanged: Function;

    constructor(props: Props) {
        super(props);
        this.onSortColumnSelected = this.onSortColumnSelected.bind(this);
        this.onSortByChanged = this.onSortByChanged.bind(this);
    }

    onSortColumnSelected(selectedMenu: any) {
        this.props.handleSortColumnSelected(selectedMenu.key);
    }

    onSortByChanged() {
        if (this.props.sortByType === SortByTypeEnum.asc) {
            this.props.handleSortByChanged(SortByTypeEnum.desc);
        } else if (this.props.sortByType === SortByTypeEnum.desc) {
            this.props.handleSortByChanged(SortByTypeEnum.asc);
        }
    }

    render() {
        let sortByIconClass= Classnames({
            'glyphicon': true,
            'glyphicon-sort-by-order': this.props.sortByType === SortByTypeEnum.asc,
            'glyphicon-sort-by-order-alt': this.props.sortByType === SortByTypeEnum.desc,
        });

        let {
            sortColumn,
            sortByType,
            handleSortColumnSelected,
            handleSortByChanged,
            ...others
        } = this.props;

        sortByType;
        handleSortColumnSelected;
        handleSortByChanged;

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
                    <a>{sortColumn}</a>
                </Dropdown>
                <SortRuleSpan onClick={() => this.onSortByChanged()} className={sortByIconClass}></SortRuleSpan>
            </div>
        );
    }
}

const SortRuleSpan = styled.span`
    font-size: 18px;
`;
SortRuleSpan.displayName = 'SortRuleSpan';