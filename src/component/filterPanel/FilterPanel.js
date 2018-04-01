// @flow
import React from 'react';
import './FilterPanel.scss';
import Translate from '../../class/translate';
import { Radio } from 'antd';
import Classnames from 'classnames';
import {DueDateFilterEnum} from '../../constant/filter';
import type {DueDateFilter} from '../../constant/filter';

type Props = {
    show: boolean,
    handleDueDateFilterChanged: (filter: DueDateFilter) => void,
    onHidden?: () => void
}
type States = {
    dueDateFilter: DueDateFilter,
    show: boolean
}

export default class FilterPanel extends React.Component<Props, States> {

    handleDueDateFilterSelected: Function;
    handleClickOutside: Function;

    static defaultProps = {
        show: false
    }

    state = {
        dueDateFilter: DueDateFilterEnum.all,
        show: false
    }

    constructor(props: Props) {
        super(props);
        this.handleDueDateFilterSelected = this. handleDueDateFilterSelected.bind(this);
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

    render() {
        let {
            handleDueDateFilterChanged,
            show,
            onHidden,
            ...others
        } = this.props;
        show;
        handleDueDateFilterChanged;
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
                        <Radio.Group onChange={this.handleDueDateFilterSelected} defaultValue={this.state.dueDateFilter}>
                            <Radio.Button value={DueDateFilterEnum.today}>{Translate.tr('Today')}</Radio.Button>
                            <Radio.Button value={DueDateFilterEnum.all}>{Translate.tr('All')}</Radio.Button>
                        </Radio.Group>
                    </div>
                    <hr/>
                    <div className="filter-group" >
                        <p>{Translate.tr('Complete Status:')}</p>
                        <Radio.Group onChange={this.handleDueDateFilterSelected} defaultValue={this.state.dueDateFilter}>
                            <Radio.Button value={DueDateFilterEnum.today}>{Translate.tr('Complete')}</Radio.Button>
                            <Radio.Button value={DueDateFilterEnum.all}>{Translate.tr('Uncompleted')}</Radio.Button>
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
