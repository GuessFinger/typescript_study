let userInput: unknown;
let useName: string;


userInput = 5;
userInput = 'Max';

// 如果定义一个变量类型为 unknown  给这个变量赋值为字符串，这样也不能给另一个string类型的变量赋值
// 如果需要这样操作的话 需要添加一步 类型判断
if (typeof userInput === 'string') {
    useName = userInput;
}

// 上面的步骤，你定义为any的话，就没有这个限制

function a(message: string): never {
    throw new Error('message');
}

// never void
// 相同点：都表示函数没有返回值
// 不同点：void 语义是返回空值，never 函数永不返回或者总抛出错误





