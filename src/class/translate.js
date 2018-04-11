// @flow
import path from 'path';
import * as fs from 'fs';

declare var __dirname: any;

export default class Translate {
    static instance: Translate;
    translates: Map<string, string>;

    constructor() {
        this.translates = new Map();
        let locale: string = navigator.language;
        let translateFilePath: string = path.join(__dirname, '/../translate', 'translate-' + locale + '.json');

        if (fs.existsSync(translateFilePath)) {
            let translateJson: any = JSON.parse(fs.readFileSync(translateFilePath, 'utf8'));
            for (let k of Object.keys(translateJson)) {
                this.translates.set(k, translateJson[k]);
            }
        }
        
    }

    static tr(key: string): string {
        if (!this.instance) {
            this.instance = new this();
        }

        let translateValue: string = this.instance.translates.get(key) || key;
        return translateValue;
    }
}