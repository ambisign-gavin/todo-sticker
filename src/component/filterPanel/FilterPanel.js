// @flow
import React from 'react';
import './FilterPanel.scss';
import Translate from '../../class/translate';
import { Radio } from 'antd';
import Classnames from 'classnames';
import {DueDateFilterEnum} from '../../constant/filter';

type Props = {
    show: boolean,
}

export default class FilterPanel extends React.Component<Props> {

    static defaultProps = {
        hidden: true,
    }

    constructor(props: Props) {
        super(props);
    }

    render() {
        let className = Classnames({
            'filter-panel': true,
            'close': !this.props.show,
        });
        return (
            <div className={className}>
                <p>{Translate.tr('Due Date')}</p>
                <Radio.Group defaultValue={DueDateFilterEnum.all}>
                    <Radio.Button value={DueDateFilterEnum.today}>{Translate.tr('Today')}</Radio.Button>
                    <Radio.Button value={DueDateFilterEnum.all}>{Translate.tr('All')}</Radio.Button>
                </Radio.Group>
            </div>
        );
    }

}
