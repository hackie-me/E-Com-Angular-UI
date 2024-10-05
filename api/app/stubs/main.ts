import { getDirname } from '@poppinss/utils';

export default class StubRoot {
    declare path: string
    constructor() {
        this.path = getDirname(import.meta.url)
    }
}