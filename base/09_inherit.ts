// 接口的主要作用
// 一个对象应该有哪些主题接口(属性和方法)
// 规定一个对象的类型是接口的时候，它内部的属性和方法必须一模一样，不能多页不能少
// 一般来说，使用interface和使用type没有什么区别 但是接口是可以被实现的
// :Person和implement Person 有什么区别？
// 接口中属性的修饰符只能用readonly 表示初始化一次后，不能再进行改变了

// 继承
// 接口可以多继承，类只能单继承
// 实现
// 类可以多实现

// 如果

let user: {
    name: string
    age: number
    sex?: string
} = {
    name: 'ez',
    age: 34
}


interface Person2 {
    age?: number;
}

interface Person {
    name: string;

    getDescription: (name: string, age: number) => void;
}

interface Animate extends Person, Person2 {
    action: string;
}

abstract class Test1 {
}

class TestAbstract extends Test1 {
    q: string;

    constructor(q: string) {
        super();
        this.q = q;
    }
}

abstract class Test2 {
    p: string = '2';
}

class Worker2 extends Test1 implements Animate {


    getDescription(name: string, age: number): void {
        console.log()
    }


    constructor(public name: string, public action: string, public age: number) {
        super();
    }


}


let user1: Person;
user1 = {
    name: 'ez',
    getDescription(name: string, age: number) {
        console.log(name, age);
    }
}

type addFunction = (n1: number, n2: number) => number;

let addFun: addFunction = (a: number, b: number) => {
    return a + b;
}

interface AddFun {
    (n1: number): void;
}

let addFun2: AddFun = (b: number) => {
    console.log(b);
}

class Test12 {
    name?: string;

    constructor(name?: string) {
        console.log(name);
        if (name) {
            this.name = name;
        }
        console.log('this.name', this.name);
    }
}


let t12 = new Test12();
