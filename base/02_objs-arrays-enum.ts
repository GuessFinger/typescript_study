const person = {
    name: 'ez',
    age: 52,
    hobbies: ['ez', 'zx', 3, true]
}
// console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby)

}

let y: [number, number] = [1, 2];
y.push(2);
console.log(y);

let x: (string | number)[];
x = [1, 2, 3];


enum Role {
    ADMIN = 10,
    READ_ONLY,
    ADMIN2,
}

console.log(Role.ADMIN);
let person2: {
    name: string,
    age: '3',
    hobbies: [number, string],
    role: Role
} = {
    name: 'ez',
    age: '3',
    hobbies: [1, '3'],
    role: Role.ADMIN
};


person2.hobbies.push(2);
console.log(person2.age);


// ts和js中的对象相同的表示
// 如果给person用object进行类型定义的话，console.log(person.name) 推断不出来它有哪些类型
// 应该给person:{属性名:类型} = {xx} 这种方式  注意类型后面可以为某个固定的值


// tuple 元组,  固定数量 定义好每一项的类型
