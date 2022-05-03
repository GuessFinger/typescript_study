console.log('hello i am coding');
// 泛型
const names: Array<string> = ['max', 'max2'];
const ages: [number, number] = [1, 2];
const p: Promise<string> = new Promise(((resolve, reject) => {
    resolve('22');
}))


// 限制泛型  extends
function merge2<T extends Object, U extends Object>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2);
}

let obj2 = merge2({name: 2}, 21);
console.log(obj2);


interface LengthFace {
    length: number;
}

function getLength<T extends LengthFace>(element: T) {
    if (element.length === 0) {
        return '00000';
    } else if (element.length === 1) {
        return '010101';
    } else {
        return '12121';
    }
}

console.log(getLength([222]))

function getValueT<T extends Object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

function getValueT1<T extends Object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

class LocalStorage<T> {
    private list: T[] = [];

    pushT(item: T) {
        this.list.push(item);
    }

    removeT(item: T) {
        let index = this.list.indexOf(item);
        this.list.splice(index, 1);
    }
}

const test: Readonly<number[]> = [1, 2];

interface A1{
    age: number;
    q: string;
}

interface A2{
    name: string;
    age: number;
}

type ss = Partial<A1 & A2>;

let sss: ss = {
    name: 'ez',
    q: 'e'
};








