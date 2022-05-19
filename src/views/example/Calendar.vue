<template>
  <LCalendar>
    <template slot="content" slot-scope="scope">
      <!-- 不同的类型组合 样式是组合新样式 或者 以某一个样式为主 -->
      <template v-if="hasType(scope.type, 'today')">
        <div class="today">今天</div>
      </template>
      <template v-else-if="hasType(scope.type, 'check_in')">
        <div class="check_in">in</div>
      </template>
      <template v-else-if="hasType(scope.type, 'active')">
        <div class="active">活动</div>
      </template>
      <template v-else-if="hasType(scope.type, 'preDate')">
        <div class="prev">
          {{ scope.date.value }}
        </div>
      </template>
      <template v-else-if="hasType(scope.type, 'nextDate')">
        <div class="next">
          {{ scope.date.value }}
        </div>
      </template>
    </template>
  </LCalendar>
</template>

<script>
import LCalendar from "@/components/System/LCalendar.vue";
export default {
  name: "Calendar",
  components: {
    LCalendar,
  },
  data() {
    return {};
  },
  methods: {
    hasType(arr, type) {
      return arr.indexOf(type) !== -1;
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  font-size: 12px;
  & > div {
    height: 100%;
  }
  .today {
    background-color: rgb(243, 221, 174);
    color: white;
  }
  .check_in {
    background-color: rgb(243, 221, 174);
    color: lightcoral;
  }
  .active {
    background-color: lightcoral;
    color: white;
  }
}
</style>