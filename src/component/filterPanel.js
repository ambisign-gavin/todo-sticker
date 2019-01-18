// @flow
import React from 'react';
import Translate from '../class/translate';
import { Radio } from 'antd';
import Classnames from 'classnames';
import { CompleteStatusFilterEnum, DueDateFilterEnum} from '../constant/filter';
import type {DueDateFilter, CompleteStatusFilter} from '../constant/filter';
import styled from 'styled-components';

type Props = {
    show: boolean,
    onDueDateFilterChanged: (filter: DueDateFilter) => void,
    onCompleteStatusFilterChanged: (filter: CompleteStatusFilter) => void,
    onHide: () => void,
    defaultDueDateFilter: DueDateFilter,
    defaultCompleteStatusFilter: CompleteStatusFilter,
}

export default class FilterPanel extends React.Component<Props> {

    static defaultProps = {
        show: false
    }

    _handleClickOutside() {
        this.props.onHide();
    }

    _handleDueDateFilterSelected(event: any) {
        let seleted: DueDateFilter = event.target.value;
        this.props.onDueDateFilterChanged(seleted);
    }

    _handleCompleteStatusFilterSelected(event: any) {
        let seleted: CompleteStatusFilter = event.target.value;
        this.props.onCompleteStatusFilterChanged(seleted);
    }

    render() {
        let {
            onDueDateFilterChanged,
            onCompleteStatusFilterChanged,
            show,
            onHide: onHidden,
            defaultDueDateFilter,
            defaultCompleteStatusFilter,
            ...others
        } = this.props;

        let usedClassName = Classnames({
            'close': !show,
        });

        return (
            <div>
                <FilterPanelDiv 
                    {...others}
                    className={usedClassName}
                >
                    <FilterGroupDiv>
                        <p>{Translate.tr('Due Date:')}</p>
                        <Radio.Group 
                            onChange={this._handleDueDateFilterSelected.bind(this)}
                            defaultValue={defaultDueDateFilter}
                        >
                            <Radio.Button
                                value={DueDateFilterEnum.today}
                            >
                                {Translate.tr('Today')}
                            </Radio.Button>
                            <Radio.Button
                                value={DueDateFilterEnum.all}
                            >
                                {Translate.tr('All')}
                            </Radio.Button>
                        </Radio.Group>
                    </FilterGroupDiv>
                    <hr/>
                    <FilterGroupDiv >
                        <p>{Translate.tr('Complete Status:')}</p>
                        <Radio.Group
                            onChange={this._handleCompleteStatusFilterSelected.bind(this)}
                            defaultValue={defaultCompleteStatusFilter}
                        >
                            <Radio.Button 
                                value={CompleteStatusFilterEnum.all}
                            >
                                {Translate.tr('All')}
                            </Radio.Button>
                            <Radio.Button
                                value={CompleteStatusFilterEnum.complete}
                            >
                                {Translate.tr('Complete')}
                            </Radio.Button>
                            <Radio.Button
                                value={CompleteStatusFilterEnum.uncomplete}
                            >
                                {Translate.tr('Uncompleted')}
                            </Radio.Button>
                        </Radio.Group>
                    </FilterGroupDiv>
                </FilterPanelDiv>
                {
                    (show? (<MaskDiv onClick={this._handleClickOutside.bind(this)} />): null)
                }
            </div>
        );
    }

}

const FilterPanelDiv = styled.div`
    position: absolute;
    z-index: 100;
    width: 80%;
    height: auto;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0px 0px 3px #888888;
    transition: all .2s ease-in-out;
    transform: scale(1);
    transform-origin: 0% 0%;
    &.close {
        transform: scale(0);
    }
`;
FilterPanelDiv.displayName = 'FilterPanelDiv';

const FilterGroupDiv = styled.div`
    margin: 10px 0;
`;
FilterGroupDiv.displayName = 'FilterGroupDiv';

const MaskDiv = styled.div`
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 99;
    position: fixed;
    width: 100%;
    height: 100%;
`;
MaskDiv.displayName = 'MaskDiv';