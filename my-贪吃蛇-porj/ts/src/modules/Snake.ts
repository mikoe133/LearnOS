export default class Snake{
    head:HTMLElement
    bodies:HTMLCollection
    element:HTMLElement
    constructor(){
        this.head = document.querySelector('#snake>div')!
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
        this.element = document.getElementById('snake')!
    }
    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }
    set X(value:number){
        if(this.X === value) return
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了')
        }
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // 判断蛇头是否和身体发生重叠
            if(value > this.X){
                // 如果新值大于旧值，说明蛇在向右走，此时发生重叠，则将蛇的移动方向设置为向左
                value = this.X - 10
            }else{
                value = this.X + 10
            }
        }
        this.movebody()
        this.head.style.left = value + 'px'
        this.checkhead()
    }
    set Y(value:number){
        if(this.Y === value) return
        if(value<0 || value>290){
            throw new Error('蛇撞墙了')
        }
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            // 判断蛇头是否和身体发生重叠
            if(value > this.Y){
                // 如果新值大于旧值，说明蛇在向右走，此时发生重叠，则将蛇的移动方向设置为向左
                value = this.Y - 10
            }else{
                value = this.Y + 10
            }
        }
        this.movebody()
        this.head.style.top = value + 'px'
        this.checkhead()
    }
    addBody(){
        this.element.insertAdjacentHTML('beforeend','<div></div>')
    }
    movebody(){
        for(let i = this.bodies.length-1;i>0;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }
    checkhead(){
        for(let i = 1;i<this.bodies.length;i++){
            if(this.X===(this.bodies[i] as HTMLElement).offsetLeft && this.Y===(this.bodies[i] as HTMLElement).offsetTop){
                throw new Error('蛇撞到自己了')
            }
        }
    }
}