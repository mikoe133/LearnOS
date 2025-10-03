<!--  -->
<template>
  <div class="">
    <School></School>
    <Student></Student>
  </div>
</template>
<script>
import School from './3School.vue';
import Student from './4Student.vue';
export default {
    name:"App",
    data() {
        return {
        }
    },
    components:{
        School,Student
    },
    methods:{

    },
    created() {

    },
    mounted() {

    }
}
</script>
<style scoped>

</style>