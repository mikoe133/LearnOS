((doc,loc,location)=>{
    const oUsername= doc.querySelector('#username');
    const oEnterbtn= doc.querySelector('#entry');
    const init =()=>{
        bindevent();
    }
    function bindevent(){
        oEnterbtn.addEventListener('click',handleenter,false)
    }
    function handleenter(){
        console.log(oUsername);
        const username= oUsername.value.trim()
        if(username.length<=6){
            alert('用户名长度不能小于6位')
            return
        }
        loc.setItem('username',username)
        location.href = 'index.html'
    }
    init();//入口函数
})(document,localStorage,location)