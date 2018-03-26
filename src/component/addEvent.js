// @flow
import React from 'react';
import StringTool from 'string';

type Props = {
    handleAddEvent: (descrtiption: string) => void
}

type State = {
    isCanAdd: boolean,
};


export default class AddEvent extends React.Component<Props, State> {
    textarea: ?HTMLTextAreaElement;
    handleTextareaChange: Function;
    descrtiption: string;

    constructor(props: Props) {
        super(props);
        this.state = {
            isCanAdd: false
        };
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    handleTextareaChange(event: SyntheticEvent<HTMLTextAreaElement>) {

        this.descrtiption = event.currentTarget.value;

        if (this.descrtiption == null || StringTool(this.descrtiption).isEmpty()) {
            this.setState({isCanAdd: false});
            return;
        }
        this.setState({isCanAdd: true});
    }

    render() {
        return (
            <div>
                <textarea onChange={this.handleTextareaChange} />
                <br/>
                <button disabled={!this.state.isCanAdd} onClick={() => this.props.handleAddEvent(this.descrtiption)}> 12 </button>
            </div>
        );
    }
}

