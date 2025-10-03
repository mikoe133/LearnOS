<!--  -->
<template>
    <div class="a">
        <div>
            <h2>学生姓名{{ name }}</h2>
            <h2>学生地址{{ address }}</h2>
            <button @click="showname">点我提示学校名</button>
        </div>
    </div>
</template>
<script>
 export default({
        name:'student',
        data() {
            return {
                    name: '首义薛屹阳',
                    address: '武汉使用'
            }
        },
        methods:{
            showname(){
                alert(this.name)
            }
        }
    })
    // export default school;
</script>
<style scoped>
.a{

}
</style>