// @flow
import React from 'react';
import { Button } from 'antd';
import Translate from '../../class/translate';

type Props = {

}

export default (props: Props) => (
    <Button {...props}>{Translate.tr('filter')}</Button>
);
