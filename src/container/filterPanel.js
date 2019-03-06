// @flow
import React from 'react';
import { Radio } from 'antd';
import Classnames from 'classnames';
import { CompleteStatusFilterEnum, DueDateFilterEnum} from '../constant/filter';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { type DueDateFilter, type CompleteStatusFilter } from '../constant/filter';
import { settingDueDateFilter, settingCompleteStatusFilter } from '../actions/filter';
import { type AppState } from '../states/index';

type Props = {
    show: boolean,
    onDueDateFilterChanged: (filter: DueDateFilter) => void,
    onCompleteStatusFilterChanged: (filter: CompleteStatusFilter) => void,
    onHide: () => void,
    dueDate: DueDateFilter,
    completeStatus: CompleteStatusFilter,
}

class FilterPanel extends React.Component<Props> {

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
            dueDate,
            completeStatus,
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
                        <p>Due Date:</p>
                        <Radio.Group 
                            onChange={this._handleDueDateFilterSelected.bind(this)}
                            defaultValue={dueDate}
                        >
                            <Radio.Button
                                value={DueDateFilterEnum.today}
                            >
                                Today
                            </Radio.Button>
                            <Radio.Button
                                value={DueDateFilterEnum.all}
                            >
                                All
                            </Radio.Button>
                        </Radio.Group>
                    </FilterGroupDiv>
                    <hr/>
                    <FilterGroupDiv >
                        <p>Complete Status:</p>
                        <Radio.Group
                            onChange={this._handleCompleteStatusFilterSelected.bind(this)}
                            defaultValue={completeStatus}
                        >
                            <Radio.Button 
                                value={CompleteStatusFilterEnum.all}
                            >
                                All
                            </Radio.Button>
                            <Radio.Button
                                value={CompleteStatusFilterEnum.complete}
                            >
                                Complete
                            </Radio.Button>
                            <Radio.Button
                                value={CompleteStatusFilterEnum.uncomplete}
                            >
                                Uncompleted
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

const mapStateToProps = (state: AppState) => (
    {
        dueDate: state.filter.dueDate,
        completeStatus: state.filter.completeStatus,
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        onDueDateFilterChanged: (filter: DueDateFilter) => dispatch(settingDueDateFilter(filter)),
        onCompleteStatusFilterChanged: (filter: CompleteStatusFilter) => dispatch(settingCompleteStatusFilter(filter))
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterPanel);


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