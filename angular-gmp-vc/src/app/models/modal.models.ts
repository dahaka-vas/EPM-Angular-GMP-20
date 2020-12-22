import { Subject } from 'rxjs';

export interface IModal {
    componentInstance?: any;
    result: Subject<any>;
}
