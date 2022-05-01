function add(n1: number, n2: number): string {
    return n1 + n2 + '';
}

function print12(num: number): undefined {
    console.log(num);
    return;
}

function print2(num: number): void {
    console.log(num);
    return;
}

let defineFunction: (a1: number, b2: number) => string;

defineFunction = add;
defineFunction(1, 2);


function qu(a: number, b: number, callback: (c: number) => void) {
    let result = a + b;
    callback(result);
}

qu(2,3,(c:number) => {
    console.log(c);
})
