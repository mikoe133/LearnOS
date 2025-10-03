<!--  -->
<template>
    <div class="a">
        <div>
            <h2>学校名称{{ name }}</h2>
            <h2>学校地址{{ address }}</h2>
            <button @click="showname">点我提示学校名</button>
        </div>
    </div>
</template>
<script>
 export default({
        name:'school',
        data() {
            return {
                    name: '首义',
                    address: '武汉'
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