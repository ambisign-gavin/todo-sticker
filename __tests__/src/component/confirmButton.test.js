// @flow
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
import ConfirmButton from '../../../src/component/confirmButton';
import { Modal } from 'antd';

describe('ConfirmButton', () => {
    let wrapper: ShallowWrapper;
    let handleOk = jest.fn();
    let config = {
        title: 'Are you sure?',
        okText: 'sure',
        cancelText: 'wait',
        onOk: handleOk,
    };
    beforeAll(() => {
        wrapper = shallow(
            <ConfirmButton
                config={config}
            />
        );
    });

    it('should render correct', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should execute confirm', () => {
        let confirm = jest.spyOn(Modal, 'confirm');
        wrapper.find('a').simulate('click');
        expect(confirm.mock.calls.length).toEqual(1);
        expect(confirm.mock.calls[0][0]).toEqual(config);
    });

    it('should execute onOk', () => {
        let confirm = jest.spyOn(Modal, 'confirm');
        wrapper.find('a').simulate('click');
        confirm.mock.calls[0][0].onOk();
        expect(handleOk.mock.calls.length).toEqual(1);
    });

});