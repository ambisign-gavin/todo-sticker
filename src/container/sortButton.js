// @flow
import React from 'react';
import { Menu, Dropdown } from 'antd';
import {SortColumnEnum, SortByTypeEnum} from '../constant/sort';
import type {SortColumn, SortByType} from '../constant/sort';
import Classnames from 'classnames';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {settingSortColumn, settingSortBy} from '../actions/sort';
import type {AppState} from '../states/index';

type Props = {
    sortColumn: SortColumn,
    sortByType: SortByType,
    onSortColumnSelected: (column: SortColumn) => void,
    onSortByChanged: (sortBy: SortByType) => void,
}

class SortButton extends React.Component<Props> {

    _handleSortColumnSelected(selectedMenu: any) {
        this.props.onSortColumnSelected(selectedMenu.key);
    }

    _handleSortByChanged() {
        if (this.props.sortByType === SortByTypeEnum.asc) {
            this.props.onSortByChanged(SortByTypeEnum.desc);
        } else if (this.props.sortByType === SortByTypeEnum.desc) {
            this.props.onSortByChanged(SortByTypeEnum.asc);
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
            onSortColumnSelected: handleSortColumnSelected,
            onSortByChanged: handleSortByChanged,
            ...others
        } = this.props;

        let menu = (
            <Menu 
                onClick={this._handleSortColumnSelected.bind(this)}
            >
                <Menu.Item 
                    key={SortColumnEnum.dueDate}
                >
                    <a>Due Date</a>
                </Menu.Item>
                <Menu.Item
                    key={SortColumnEnum.createTime}
                >
                    <a>Create Time</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div {...others} >
                <p style={{display: 'inline'}} >
                    Sort by
                </p>
                <Dropdown 
                    overlay={menu}
                    trigger={['click']}
                >
                    <a>{sortColumn}</a>
                </Dropdown>
                <SortRuleSpan 
                    onClick={this._handleSortByChanged.bind(this)} 
                    className={sortByIconClass}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => (
    {
        sortColumn: state.sort.sortColumn,
        sortByType: state.sort.sortBy
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        onSortColumnSelected: (column: SortColumn) => dispatch(settingSortColumn(column)),
        onSortByChanged: (sortBy: SortByType) => dispatch(settingSortBy(sortBy))
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortButton);

const SortRuleSpan = styled.span`
    font-size: 18px;
`;
SortRuleSpan.displayName = 'SortRuleSpan';