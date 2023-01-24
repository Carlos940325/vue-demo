<template>
  <div class="aboutPage">
    <ArticalCarlos :prop="articalProps()" />
  </div>
</template>
<script>
import ArticalCarlos from '../components/aboutPageCPT/ArticalCarlos.vue'
export default {
  components: {
    ArticalCarlos
  },
  data(){
    return {
      
    }
  },
  methods: {
    articalProps(){
      const {query: {id}} = this.$route
      return {
        id,
        name: 'carlos',
        age: 123,
        handleOk: () => {console.log('ok')}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.aboutPage {
  width: 100%;
}
</style>