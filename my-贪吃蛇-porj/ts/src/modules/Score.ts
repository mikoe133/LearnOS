class Score{
    score:number = 0
    level = 1
    scoreele:HTMLElement
    levelele:HTMLElement
    constructor(){
        this.scoreele = document.getElementById('score')!
        this.levelele = document.getElementById('level')!
    }
    addScore(){
        this.score++
        this.scoreele.innerHTML = this.score + ''
        if(this.score % 10 == 0){
            this.levelUp()
        }
    }
    levelUp(){
        this.level++
        this.levelele.innerHTML = this.level +""
    }
}
export default Score