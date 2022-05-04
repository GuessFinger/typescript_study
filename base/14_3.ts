// 如果遇到js的库，你需要安装用ts编写的库

class Product12 {
    title: string;
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    getInfo() {
        return [this.title, `$${this.price}`];
    }
}

// 老师说得这种情况  如果后台返回的数据 我们需要转成Product对象 该怎么处理？
let productList = [{name: 'ez', price: 12}]


import 'reflect-metadata';
import {plainToClass} from "class-transformer";

let newProductList2 = plainToClass(Product12, productList);


let newProductList = productList.map(item => {
    return new Product12(item.name, item.price);
});

newProductList.forEach(item => {
    console.log(item.getInfo());
})


