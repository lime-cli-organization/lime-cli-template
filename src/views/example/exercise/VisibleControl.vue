<template>
  <div>
    <div v-for="(item, index) in questionArr" :key="index" class="item">
      <template v-if="currentIndex === index">
        <p v-html="item.question"></p>
        <div class="options">
          <van-radio-group v-model="item.customer_answer">
            <van-radio
              v-for="option in item.options"
              :key="option"
              :name="option"
            >
              {{ option }}
            </van-radio>
          </van-radio-group>
          your answer is
          {{ item.customer_answer === item.correct_answer ? "right" : "error" }}
        </div>
      </template>
    </div>
    <van-button
      type="primary"
      plain
      size="small"
      @click="prevTopic"
      :disabled="currentIndex < 1"
    >
      上一题
    </van-button>
    <van-button
      type="primary"
      plain
      size="small"
      @click="nextTopic"
      :disabled="currentIndex > questionArr.length - 2"
    >
      下一题
    </van-button>
  </div>
</template>

<script>
export default {
  name: "VisibleControl",
  data() {
    return {
      currentIndex: 0,
      questionArr: [
        {
          question:
            "Which one of these was not a beach landing site in the Invasion of Normandy?",
          correct_answer: "Silver",
          options: ["Gold", "Silver", "Juno", "Sword"],
        },
        {
          difficulty: "easy",
          question:
            "King Henry VIII was the second monarch of which European royal house?",
          correct_answer: "Tudor",
          options: ["York", "Stuart", "Lancaster", "Tudor"],
        },
        {
          difficulty: "easy",
          question:
            "Which one of these tanks was designed and operated by the United Kingdom?",
          correct_answer: "Tog II",
          options: ["M4 Sherman", "Tog II", "Tiger H1", "T-34"],
        },
        {
          difficulty: "easy",
          question:
            "Which of the following ancient peoples was NOT classified as Hellenic (Greek)?",
          correct_answer: "Illyrians",
          options: ["Illyrians", "Dorians", "Achaeans", "Ionians"],
        },
        {
          difficulty: "easy",
          question:
            "Which famous world leader is famed for the saying, &quot;Let them eat cake&quot;, yet is rumored that he/she never said it at all?",
          correct_answer: "Marie Antoinette",
          options: [
            "Czar Nicholas II",
            "Elizabeth I",
            "Marie Antoinette",
            "Henry VIII",
          ],
        },
      ],
    };
  },
  created() {},
  methods: {
    prevTopic() {
      --this.currentIndex;
    },
    nextTopic() {
      ++this.currentIndex;
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
}
p {
  line-height: 2;
  margin-top: 20px;
}
.options {
  /deep/ .van-radio {
    height: 30px;
  }
}
</style>
