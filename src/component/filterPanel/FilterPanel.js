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
    handleDueDateFilterChanged: (filter: DueDateFilter) => void
}
type States = {
    dueDateFilter: DueDateFilter,
}

export default class FilterPanel extends React.Component<Props, States> {

    handleDueDateFilterSelected: Function;

    static defaultProps = {
        show: false
    }

    state = {
        dueDateFilter: DueDateFilterEnum.all,
    }

    constructor(props: Props) {
        super(props);
        this.handleDueDateFilterSelected = this. handleDueDateFilterSelected.bind(this);
    }

    handleDueDateFilterSelected(event: any) {
        let seleted: DueDateFilter = event.target.value;
        this.props.handleDueDateFilterChanged(seleted);
    }

    render() {
        let {
            handleDueDateFilterChanged,
            show,
            ...others
        } = this.props;

        handleDueDateFilterChanged;

        let usedClassName = Classnames({
            'filter-panel': true,
            'close': !show,
        });


        return (
            <div className={usedClassName} {...others} >
                <p>{Translate.tr('Due Date')}</p>
                <Radio.Group onChange={this.handleDueDateFilterSelected} defaultValue={this.state.dueDateFilter}>
                    <Radio.Button value={DueDateFilterEnum.today}>{Translate.tr('Today')}</Radio.Button>
                    <Radio.Button value={DueDateFilterEnum.all}>{Translate.tr('All')}</Radio.Button>
                </Radio.Group>
            </div>
        );
    }

}
