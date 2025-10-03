class Food{
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement
    // 定义一个属性表示食物的位置
    constructor(){
        this.element = document.getElementById('food')!
    }
    get X(){
        return this.element.offsetLeft
    }
    get Y(){
        return this.element.offsetTop
    }
    // 修改食物的位置
    change(){
        // 生成一个随机的位置
        let left = Math.round(Math.random()*28)*10
        let top = Math.round(Math.random()*28)*10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
        // 把最新的位置存储到food对象中，方便后面获取
    }
}

export default Food