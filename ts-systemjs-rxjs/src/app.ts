import {of} from 'rxjs';
import { fromEvent } from 'rxjs';

const source = [1,2,3,4,5];

of(source).subscribe((el) => {
    console.log(el);
})

const move$ = fromEvent(document, 'mousemove');

move$.subscribe((e)=>{
    console.log(e);
})