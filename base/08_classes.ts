abstract class Department {
    protected employees: string[] = [];

    constructor(public name: string, private readonly id: number) {
    }

    run(this: Department) {
        console.log(this.name);
    }

    addEmployee() {
        this.employees.push('ez');
    }

    abstract abstractTest(number: string): void;

}


class ItDepartment extends Department {

    private _lastReport: string = 'hello';
    private static instance: ItDepartment;

    static firstYear = '22';


    get lastReport(): string {
        return this._lastReport;
    }

    set lastReport(value: string) {
        this._lastReport = value;
    }

    static staticTest(name: string) {
        return {name};
    }


    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ItDepartment('xx', 21, 21);
        return this.instance;
    }

    private constructor(name: string, id: number, public age: number) {
        super(name, id);
    }

    run() {
        console.log(this.name);
        console.log(this.age);
        this.employees.push('x');
    }

    static getStaticTest() {
        console.log(this.firstYear);
    }

    abstractTest(number: string): void {
        console.log(number);
    }
}


// ts中怎么保证单例模式
// 1. 构造函数用private进行修饰，这样的目的是不能同构关键字new进行创建
// 2. 创建一个实例属性 private static instance:定义类型
// 3. 创建获取实例的静态方法  主要判断当前this.instance 是否存在 不存在创建，存在直接返回

// const p = new ItDepartment('ez', 600, 526);
// console.log(p.lastReport);


// const p2 = { name: '34', run: p.run}
// p2.run()
