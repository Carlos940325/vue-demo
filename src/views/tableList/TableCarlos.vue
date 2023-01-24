<template>
  <div style="width: 100%;">
    <t-row>
      <t-col :span="12"><DetailList /></t-col>
    </t-row>
  </div>
</template>

<script>
import DetailList from '@/components/tableCPT/DetailList.vue';
export default {
    components: {
        DetailList
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="less" scoped>

</style>