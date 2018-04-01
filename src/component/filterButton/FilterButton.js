// @flow
import React from 'react';
import { Button } from 'antd';
import Translate from '../../class/translate';

type Props = {
    onClick: () => void,
}

export default class FilterButton extends React.Component<Props> {

    render() {
        let {
            onClick,
            ...others
        } = this.props;
        return (
            <Button onClick={onClick} {...others} >{Translate.tr('filter')}</Button>
        );
    }
}
