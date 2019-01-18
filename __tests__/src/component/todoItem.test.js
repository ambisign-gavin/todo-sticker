// @flow
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TodoItem from '../../../src/component/todoItem';

describe('TodoItem', () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
        wrapper = shallow(
            <TodoItem
                todo={{
                    id: '1',
                    dueDatetime: 10,
                    description: 'Hello!',
                    complete: false,
                    createTime: 0,
                }}
            />
        );
    });

    it('should render correct with short description', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct with long description', () => {
        wrapper.setProps({
            todo: {
                id: '1',
                dueDatetime: 10,
                description: 'Hello!\rLineTwo\rLineThree',
                complete: false,
                createTime: 0,
            }
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct with completed', () => {
        wrapper.setProps({
            todo: {
                id: '1',
                dueDatetime: 10,
                description: 'Hello!',
                complete: true,
                createTime: 0,
            }
        });
        expect(wrapper).toMatchSnapshot();
    });

});