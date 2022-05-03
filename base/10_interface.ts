console.log('new code  come on');

type admin = {
    name: string;
}

type employee = {
    age: number;
}

type Universal = admin & employee;

let use: Universal = {
    name: 'ez',
    age: 12
}

interface Test22 {
    name: string
}

interface Test21 {
    age: number
}

interface Test32 extends Test22, Test21 {
}

type test34 = Test22 & Test21;

let user33: test34 = {
    name: 'ez',
    age: 21
}

type q1 = {
    name: string;
    x: string[];
}
type q2 = {
    age: number;
    y: number[];
}
type q12 = q1 | q2;

function q12f(q: q12) {
    if ('name' in q) {
        console.log(q.name);
    }
    if ('age' in q) {
        console.log(q.age)
    }
}

class q6 {
    doSomething() {
        console.log(111);
    }
}

class q7 {
    talk() {
        console.log(21212);
    }

    run() {
        console.log(212121212);
    }
}

type q67 = q6 | q7;

function q67f(n: q67) {
    if (n instanceof q7) {
        n.run();
    }
}


interface T1 {
    type: 't1';
    query: '3';

    run(): void;
}

interface T2 {
    type: 't2';
    query: '4';

    work(): void;
}

type T12 = T1 | T2;

function T12Fun(t: T12) {
    let x;
    switch (t.query) {
        case "3":
            t.run();
            break;
        case "4":
            t.work();
            break;
    }
}

// let inputElement = <HTMLInputElement>document.getElementById('app')!;
let inputElement = document.getElementById('app')! as HTMLInputElement;
inputElement.value = 'hello world';


interface ErrorContainer {
    [name: string]: string;
}

let user2222: ErrorContainer = {
    name: 'ez',
    email: 'dfsa@fdsafd.com'
}

type a = number | string;
type b = number | string;


// 函数重载？
function add1212(a: number, b: number): number;
function add1212(a: string, b: string): string;
function add1212(a: number, b: string): string;
function add1212(a: a, b: b): a {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString;
    }
    return a + b;
};
