<template>
  <div>
    <van-button type="primary" plain size="small" @click="nextTopic">
      下一题
    </van-button>
  </div>
</template>

<script>
// name > components > mixins > props > data > computed > watch > filter > 钩子函数 > methods
export default {
  name: 'Topic',
  data() {
    return {
      backData: {
        preId: '',
        TopicInfo: {},
        nextId: '',
      },
    };
  },
  watch: {
    '$route.params': {
      handler() {
        // 路由变化做出响应
        console.log('params change');
      },
      deep: true,
    },
  },
  methods: {
    nextTopic() {
      const id = Number(this.$route.params.id) + 1;
      this.$router.push({
        path: `/online/topic/${id}`,
      });
    },
  },
};
</script>
