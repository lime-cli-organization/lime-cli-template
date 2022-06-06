<template>
  <div class="l_calendar">
    <div class="sevent">
      <span v-for="(item, index) in getCurrentWeek(current)" :key="index">
        {{ item | formatDate }}
      </span>
    </div>
    <button class="toggle" @click="toggleCalendar">这是一个折叠箭头</button>
    <template v-if="IsCalendarVisible">
      <div class="header">
        <button @click="changeMonth('prev')">上</button>
        <span>{{ year }}年{{ month + 1 }}月</span>
        <button @click="changeMonth('next')">下</button>
      </div>
      <div class="pannel">
        <table>
          <thead>
            <tr>
              <th v-if="weekBegin === 'sunday'">周日</th>
              <th>周一</th>
              <th>周二</th>
              <th>周三</th>
              <th>周四</th>
              <th>周五</th>
              <th>周六</th>
              <th v-if="weekBegin === 'monday'">周日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dateArr" :key="index + 'b'">
              <td v-for="date in item" :key="date.value">
                <div class="content">
                  <!-- 
                    顺序：
                      之前
                        补签
                        签过到的
                      当前&之后
                        日期
                        活动
                        连签积分
                   -->
                  <slot name="content" :type="getType(date)" :date="date">
                  </slot>
                </div>
                <slot name="date">
                  {{ date.value }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
<script>
// name > components > mixins > props > data > computed > watch > filter > 钩子函数 > methods
export default {
  name: "LCalendar",
  props: {
    current: {
      require: true,
      default: () => {
        return new Date();
      },
    },
    // checkIn:{
    //   type: Array
    // },
    weekBegin: {
      validator: function (value) {
        return ["monday", "sunday"].indexOf(value) !== -1;
      },
      default: "monday",
    },
  },
  data() {
    return {
      year: "",
      month: "", // month + 1 === 当前月份
      day: "", // 一周中的第几天
      date: "", // 一个月的第几天
      dateArr: [],
      checkIn: [
        new Date(2021, 11, 26),
        new Date(2022, 1, 26),
        new Date(2022, 2, 29),
        new Date(2022, 3, 12),
        new Date(2021, 3, 15),
        new Date(2022, 3, 16),
        new Date(2022, 4, 17),
      ],
      activeArr: [new Date(2022, 4, 20), new Date(2022, 4, 28)],
      IsCalendarVisible: true,
    };
  },
  computed: {
    isLeap() {
      const { year } = this;
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
      }
      return false;
    },
    current7days() {
      const { current } = this;
      const oneDay = 1000 * 60 * 60 * 24;
      const arr = new Array(7);
      for (let i = 1; i < 8; i++) {
        if (i < 4) {
          arr[i] = new Date(current - (4 - i) * oneDay);
        } else if (i > 4) {
          arr[i] = new Date((i - 4) * oneDay + current.getTime());
        } else {
          arr[i] = current;
        }
      }
      arr.shift();
      return arr;
    },
  },
  filters: {
    formatDate(date) {
      const month = date.getMonth() + 1;
      const date1 = date.getDate();
      return `${month}.${date1}`;
    },
  },
  created() {
    this.year = this.current.getFullYear();
    this.month = this.current.getMonth();
    this.day = this.current.getDay();
    this.date = this.current.getDate();
    this.getCalendar();
  },
  methods: {
    toggleCalendar() {
      this.IsCalendarVisible = !this.IsCalendarVisible;
    },
    imgClass(date) {
      const dateFull = this.getFullDate(date);
      if (this.arrContains(this.activeArr, dateFull)) {
        return true;
      }
    },

    getMonthTotalDay(month) {
      const monthDaysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (this.isLeap) {
        monthDaysArr[1] = 29;
      }
      return monthDaysArr[month];
    },
    getCalendar() {
      const { year, month, weekBegin } = this;
      const monthDays = this.getMonthTotalDay(month);
      const date = new Date(year, month, 1);
      const beginDayOnWeek =
        this.weekBegin === "monday"
          ? date.getDay() === 0
            ? 6
            : date.getDay() - 1
          : date.getDay(); // 1号是周几 0为周日
      let arr = new Array();
      let temp = 0; // 日期
      const prevMonthDays = this.getMonthTotalDay(month === 0 ? 11 : month - 1);
      let nextMonthBegin = 1;
      let prevMonthWeekDiff = beginDayOnWeek - 1;
      const monthWeeks = this.getWeeks(year, month, weekBegin);
      // 一月最多6周
      for (let i = 0; i < monthWeeks; i++) {
        arr[i] = new Array();
        for (let j = 0; j < 7; j++) {
          temp++;
          if (temp - beginDayOnWeek <= 0) {
            arr[i][j] = {
              type: "prev",
              value: prevMonthDays - prevMonthWeekDiff--,
            };
          } else if (temp - beginDayOnWeek > monthDays) {
            arr[i][j] = { type: "next", value: nextMonthBegin++ };
          } else {
            arr[i][j] = { type: "current", value: temp - beginDayOnWeek };
          }
        }
      }
      this.dateArr = arr;
    },
    /**
     * 一个月有几周
     * @param {Number} year
     * @param {Number} month
     * @param { 'sunday' | 'monday' } weekBegin 周起始是周日 or 周一
     * @returns {Number} 一个月的周数
     */
    getWeeks(year, month, weekBegin = "monday") {
      const monthDay = this.getMonthTotalDay(month);
      const beginDate = new Date(year, month, 1);
      const endDate = new Date(year, month, monthDay);
      let weekStart = beginDate.getDay();
      let weekEnd = endDate.getDay();
      let firstWeekDays, lastWeekDays;
      if (weekBegin === "sunday") {
        firstWeekDays = weekStart === 0 ? 7 : 7 - weekStart;
        lastWeekDays = weekEnd === 0 ? 1 : weekEnd + 1;
      } else {
        firstWeekDays = weekStart === 0 ? 7 : 7 - weekStart + 1;
        lastWeekDays = weekEnd === 0 ? 7 : weekEnd;
      }
      return 2 + (monthDay - (firstWeekDays + lastWeekDays)) / 7;
    },
    /**
     * 获取当前周日期数组
     * @param {Date} current 当前时间
     * @returns {Array} 当前周日期的数据
     */
    getCurrentWeek(current) {
      let arr = [];
      const timeStamp = current.getTime();
      let currentDay = current.getDay();
      const oneDay = 1000 * 60 * 60 * 24;
      for (let i = 0; i < 7; i++) {
        const date = new Date(timeStamp + ((i - currentDay - 6) % 7) * oneDay);
        arr.push(date);
      }
      return arr;
    },
    changeMonth(type) {
      if (type === "prev") {
        if (this.month === 0) {
          this.year--;
          this.month = 11;
        } else {
          this.month--;
        }
      } else {
        if (this.month === 11) {
          this.year++;
          this.month = 0;
        } else {
          this.month++;
        }
      }
      this.getCalendar();
    },
    // 根据表格的日期计算年月日
    getFullDate(date) {
      const { year: currentYear, month: currentMonth } = this;
      let year = currentYear,
        month = currentMonth;
      date = date + "";
      if (date.search("prev") !== -1) {
        date = Number(date.replace("prev", ""));
        if (currentMonth === 0) {
          year--;
          month = 11;
        } else {
          month--;
        }
      } else if (date.search("next") !== -1) {
        date = Number(date.replace("next", ""));
        if (currentMonth === 11) {
          year++;
          month = 0;
        } else {
          month++;
        }
      } else {
        date = Number(date);
      }
      return new Date(year, month, date);
    },
    // 时间数组中是否包含特定时间date
    arrContains(dateArr, date) {
      const arrTime = dateArr.map((item) => item.getTime());
      return arrTime.indexOf(date.getTime()) !== -1;
    },
    // 和当前时间比较
    compareData(date) {
      const dateFull = this.getFullDate(date);
      if (this.getCurrentDate().getTime() == dateFull.getTime()) {
        return 0;
      } else if (this.getCurrentDate().getTime() > dateFull.getTime()) {
        return -1;
      } else if (this.getCurrentDate().getTime() < dateFull.getTime()) {
        return 1;
      }
    },
    // 获取当前日期
    getCurrentDate() {
      const { current } = this;
      const today = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate()
      );
      return today;
    },
    // 类型
    getType(item) {
      const { type, value: date } = item;
      const dateFull = this.getFullDate(date);
      let ret = [];
      ret.push(type);
      if (this.getCurrentDate().getTime() == dateFull.getTime()) {
        ret.push("today");
      } else if (this.getCurrentDate().getTime() > dateFull.getTime()) {
        ret.push("preDate");
      } else if (this.getCurrentDate().getTime() < dateFull.getTime()) {
        ret.push("nextDate");
      }
      if (this.arrContains(this.checkIn, dateFull)) {
        ret.push("check_in");
      }
      if (this.arrContains(this.activeArr, dateFull)) {
        ret.push("active");
      }

      return ret;
    },
    // dynamicClass(date) {
    //   let ret = "";
    //   if (date.search("prev") !== -1) ret = "prevMonth ";
    //   if (date.search("next") !== -1) ret = "nextMonth ";
    //   const dateFull = this.getFullDate(date);
    //   if (this.getCurrentDate().getTime() == dateFull.getTime()) {
    //     ret += "current ";
    //   } else if (this.getCurrentDate().getTime() > dateFull.getTime()) {
    //     ret += "preDate ";
    //   } else if (this.getCurrentDate().getTime() < dateFull.getTime()) {
    //     ret += "nextDate ";
    //   }
    //   if (this.arrContains(this.checkIn, dateFull)) {
    //     ret += "check_in ";
    //   }
    //   if (this.arrContains(this.activeArr, dateFull)) {
    //     ret += "active ";
    //   }
    //   return ret;
    // },
  },
};
</script>
<style lang="less" scoped>
.sevent {
  width: 100%;
  display: flex;
  span {
    line-height: 2;
    width: calc(100% / 7);
    border: 1px /*no*/ solid;
  }
}
.toggle {
  margin: 30px;
  line-height: 2;
}
.l_calendar,
.header,
.pannel {
  width: 100%;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 200px;
  }
}
.pannel {
  table {
    width: 100%;
    line-height: 3;
    td {
      position: relative;
      .content {
        width: 86px;
        height: 110px;
        margin: 0 auto;
        color: rgb(243, 221, 174);
        font-weight: bold;
        font-size: 18px /*px*/;
        border: 1px /*no*/ solid rgb(243, 221, 174);
        border-radius: 8px;
      }
      span {
        line-height: 12px /*px*/;
        margin-bottom: 24px;
        color: #666666;
      }
    }
  }
}

@keyframes move {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(0.85);
  }
  to {
    transform: scale(1);
  }
}
table {
  cursor: url("@/assets/finger.png"), pointer;
}
</style>
