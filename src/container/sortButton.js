// @flow
import React from 'react';
import { Menu, Dropdown } from 'antd';
import Translate from '../class/translate';
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
    handleSortColumnSelected: (column: SortColumn) => void,
    handleSortByChanged: (sortBy: SortByType) => void,
}

class SortButton extends React.Component<Props> {

    _handleSortColumnSelected(selectedMenu: any) {
        this.props.handleSortColumnSelected(selectedMenu.key);
    }

    _handleSortByChanged() {
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

        let menu = (
            <Menu 
                onClick={this._handleSortColumnSelected.bind(this)}
            >
                <Menu.Item 
                    key={SortColumnEnum.dueDate}
                >
                    <a>{Translate.tr('Due Date')}</a>
                </Menu.Item>
                <Menu.Item
                    key={SortColumnEnum.createTime}
                >
                    <a>{Translate.tr('Create Time')}</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div {...others} >
                <p style={{display: 'inline'}} >
                    {Translate.tr(' Sort by ')}
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
        handleSortColumnSelected: (column: SortColumn) => dispatch(settingSortColumn(column)),
        handleSortByChanged: (sortBy: SortByType) => dispatch(settingSortBy(sortBy))
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