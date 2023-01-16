<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
export default {
    props: {
      name: {
        type: String,
        default: '占位符',
        required: false
      }
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="less" scoped>

</style>