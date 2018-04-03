// @flow
import React from 'react';
import './FilterPanel.scss';
import Translate from '../../class/translate';
import { Radio } from 'antd';
import Classnames from 'classnames';
import { CompleteStatusFilterEnum, DueDateFilterEnum} from '../../constant/filter';
import type {DueDateFilter, CompleteStatusFilter} from '../../constant/filter';

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
        show: false
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
            'filter-panel': true,
            'close': !this.state.show,
        });


        return (
            <div>
                <div className={usedClassName} {...others} >
                    <div className="filter-group" >
                        <p>{Translate.tr('Due Date:')}</p>
                        <Radio.Group onChange={this.handleDueDateFilterSelected} defaultValue={defaultDueDateFilter}>
                            <Radio.Button value={DueDateFilterEnum.today}>{Translate.tr('Today')}</Radio.Button>
                            <Radio.Button value={DueDateFilterEnum.all}>{Translate.tr('All')}</Radio.Button>
                        </Radio.Group>
                    </div>
                    <hr/>
                    <div className="filter-group" >
                        <p>{Translate.tr('Complete Status:')}</p>
                        <Radio.Group onChange={this.handleCompleteStatusFilterSelected} defaultValue={defaultCompleteStatusFilter}>
                            <Radio.Button value={CompleteStatusFilterEnum.all}>{Translate.tr('All')}</Radio.Button>
                            <Radio.Button value={CompleteStatusFilterEnum.complete}>{Translate.tr('Complete')}</Radio.Button>
                            <Radio.Button value={CompleteStatusFilterEnum.uncomplete}>{Translate.tr('Uncompleted')}</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                {
                    (this.state.show? (<div onClick={this.handleClickOutside} className="mask" />): null)
                }
            </div>
        );
    }

}
