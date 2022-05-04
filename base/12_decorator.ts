function logging(constructor: Function) {
    console.log('装饰器函数logging-------loggin')
    console.log(constructor);
}

class Person {
    name = 'ez';

    constructor() {
        console.log(this.name);
    }
}

// 装饰器的执行，跟实例没有关系，就是类没有实例化 它也会执行

// let p = new Person();
// console.log(p)


function logging2(title: string) {
    console.log('装饰器函数logging2------logging2')
    return function (constructor: Function) {
        console.log(title);
        console.log(constructor)
    };
}

class Person2 {
    name = '22';

    constructor() {
        console.log(this.name);
    }
}

function template2(template: string, hookId: string) {
    console.log('装饰器函数template----template')
    return function (constructor: any) {
        let element = document.getElementById(hookId);
        if (element) {
            let p = new constructor();
            element.innerHTML = template;
            element.querySelector('h1')!.textContent = p.name;
        }
    };
}

// @logging
// @logging2('装饰器logging')
// @template2('<h1>我是hello world</h1>', 'app')
class Person121 {
    name = '稍微高级一点的装饰器模式';

    constructor() {
        console.log(this.name)
    }
}


function Log(target: any, propertyName: string | Symbol) {
    console.log('------0------');
    console.log(target, propertyName);
}

function Log2(target: any, propertyName: string , description: PropertyDescriptor) {
    console.log('------2------');
    console.log(target, propertyName, description);
}

function Log3(target: any, propertyName: string | symbol , position : number ) {
    console.log('------3------');
    console.log(target, propertyName, position);
}


class Product {
    // @Log
    title: string;
    private _price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }


    get price(): number {
        return this._price;
    }
    // @Log2
    set price(value: number) {
        this._price = value;
    }


    sumPrice(mount: number) {
        return this._price * mount;
    }
}


