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
    handleDueDateFilterChanged: (filter: DueDateFilter) => void,
    handleCompleteStatusFilterChanged: (filter: CompleteStatusFilter) => void,
    onHidden?: () => void,
    defaultDueDateFilter: DueDateFilter,
    defaultCompleteStatusFilter: CompleteStatusFilter,
}
type States = {
    show: boolean
}

export default class FilterPanel extends React.Component<Props, States> {

    handleDueDateFilterSelected: Function;
    handleCompleteStatusFilterSelected: Function;
    handleClickOutside: Function;

    static defaultProps = {
        show: false
    }

    state = {
        show: this.props.show
    }

    constructor(props: Props) {
        super(props);
        this.handleDueDateFilterSelected = this. handleDueDateFilterSelected.bind(this);
        this.handleCompleteStatusFilterSelected = this.handleCompleteStatusFilterSelected.bind(this);
        this.handleClickOutside = this. handleClickOutside.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.show !== this.state.show) {
            this.setState({
                show: nextProps.show
            });
        }
    }

    handleClickOutside() {
        this.setState({
            show: false,
        });
        if (this.props.onHidden) {
            this.props.onHidden();
        }
    }

    handleDueDateFilterSelected(event: any) {
        let seleted: DueDateFilter = event.target.value;
        this.props.handleDueDateFilterChanged(seleted);
    }

    handleCompleteStatusFilterSelected(event: any) {
        let seleted: CompleteStatusFilter = event.target.value;
        this.props.handleCompleteStatusFilterChanged(seleted);
    }

    render() {
        let {
            handleDueDateFilterChanged,
            handleCompleteStatusFilterChanged,
            show,
            onHidden,
            defaultDueDateFilter,
            defaultCompleteStatusFilter,
            ...others
        } = this.props;
        show;
        handleDueDateFilterChanged;
        handleCompleteStatusFilterChanged;
        onHidden;

        let usedClassName = Classnames({
            'close': !this.state.show,
        });

        return (
            <div>
                <FilterPanelDiv className={usedClassName} {...others} >
                    <FilterGroupDiv>
                        <p>{Translate.tr('Due Date:')}</p>
                        <Radio.Group onChange={this.handleDueDateFilterSelected} defaultValue={defaultDueDateFilter}>
                            <Radio.Button value={DueDateFilterEnum.today}>{Translate.tr('Today')}</Radio.Button>
                            <Radio.Button value={DueDateFilterEnum.all}>{Translate.tr('All')}</Radio.Button>
                        </Radio.Group>
                    </FilterGroupDiv>
                    <hr/>
                    <FilterGroupDiv >
                        <p>{Translate.tr('Complete Status:')}</p>
                        <Radio.Group onChange={this.handleCompleteStatusFilterSelected} defaultValue={defaultCompleteStatusFilter}>
                            <Radio.Button value={CompleteStatusFilterEnum.all}>{Translate.tr('All')}</Radio.Button>
                            <Radio.Button value={CompleteStatusFilterEnum.complete}>{Translate.tr('Complete')}</Radio.Button>
                            <Radio.Button value={CompleteStatusFilterEnum.uncomplete}>{Translate.tr('Uncompleted')}</Radio.Button>
                        </Radio.Group>
                    </FilterGroupDiv>
                </FilterPanelDiv>
                {
                    (this.state.show? (<MaskDiv onClick={this.handleClickOutside} />): null)
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