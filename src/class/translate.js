// @flow

export default class Translate {
    static instance: Translate;
    static tr(content: string): string {
        if (this.instance) {
            return content;    
        }
        this.instance = new this();
        return content;
    }
}