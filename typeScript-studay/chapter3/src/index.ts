class Animal{
    name: string;
    age: number;
    constructor(name: string,age:number){
        this.name = name;
        this.age = age;
    }
    sayhello(){
        console.log(`hello,my name is ${this.name},I am ${this.age} years old`);  
    }
}
interface myinterface{
    name: string;
}
const obj:myinterface = {
    name: '张三',
}
class interfaceclass implements myinterface{
    name: string;
    constructor(name: string){
        this.name = name;
    }
}
class Dog extends Animal{
    sayhello() {
        super.sayhello(); // 调用父类的sayhello方法
    }
}
class cat extends Animal{
    constructor(name: string,age:number){
        super(name,age);

    }
}
const dog = new Dog('旺财', 3);
dog.sayhello(); // 输出：hello,my name is 旺财,I am 3 years old