<template>
  <div class="l_calendar">
    <div class="sevent">
      <span v-for="(item, index) in getCurrentWeek(current)" :key="index">
        {{ item | formatDate }}
      </span>
    </div>
    <button class="toggle" @click="toggleCalendar">这是一个折叠箭头</button>
    <template v-if="showCalendar">
      <div class="header">
        <button @click="changeMonth('prev')">上</button>
        <span>{{ year }}年{{ month + 1 }}月</span>
        <button @click="changeMonth('next')">下</button>
      </div>
      <div class="pannel">
        <table>
          <thead>
            <tr>
              <th v-if="weekBegin === 'sunday'">日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
              <th v-if="weekBegin === 'monday'">日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dateArr" :key="index + 'b'">
              <td
                v-for="date in item"
                :key="date + 'a'"
                :class="dynamicClass(date)"
              >
                {{ date.replace('prev', '').replace('next', '') }}
                <img v-if="imgClass(date)" src="@/assets/finger.png" />
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
  name: 'LCalendar',
  data() {
    return {
      // current: new Date(2021, 9, 12),
      current: new Date(2022, 3, 17),
      year: '',
      month: '', // month + 1 === 当前月份
      day: '', // 一周中的第几天
      date: '', // 一个月的第几天
      dateArr: [],
      checkIn: [
        new Date(2021, 11, 26),
        new Date(2022, 1, 26),
        new Date(2022, 2, 29),
        new Date(2022, 3, 12),
        new Date(2021, 3, 15),
        new Date(2022, 3, 16),
        new Date(2022, 3, 17),
      ],
      activeArr: [new Date(2022, 3, 20), new Date(2022, 3, 4)],
      showCalendar: false,
      weekBegin: 'monday', // monday | sunday
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
    console.log(this.getCurrentWeek(this.current));
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
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
        this.weekBegin === 'monday'
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
            arr[i][j] = 'prev' + (prevMonthDays - prevMonthWeekDiff--);
          } else if (temp - beginDayOnWeek > monthDays) {
            arr[i][j] = 'next' + nextMonthBegin++;
          } else {
            arr[i][j] = temp - beginDayOnWeek + '';
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
    getWeeks(year, month, weekBegin = 'monday') {
      const monthDay = this.getMonthTotalDay(month);
      const beginDate = new Date(year, month, 1);
      const endDate = new Date(year, month, monthDay);
      let weekStart = beginDate.getDay();
      let weekEnd = endDate.getDay();
      let firstWeekDays, lastWeekDays;
      if (weekBegin === 'sunday') {
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
      if (type === 'prev') {
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
      date = date + '';
      if (date.search('prev') !== -1) {
        date = Number(date.replace('prev', ''));
        if (currentMonth === 0) {
          year--;
          month = 11;
        } else {
          month--;
        }
      } else if (date.search('next') !== -1) {
        date = Number(date.replace('next', ''));
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
    dynamicClass(date) {
      let ret = '';
      if (date.search('prev') !== -1) ret = 'prev ';
      if (date.search('next') !== -1) ret = 'next ';
      const dateFull = this.getFullDate(date);
      if (this.current.getTime() == dateFull.getTime()) {
        ret += 'current ';
      }
      if (this.arrContains(this.checkIn, dateFull)) {
        ret += 'check_in ';
      }
      return ret;
    },
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
    border: 1px solid;
  }
}
.toggle {
  margin: 15px;
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
    width: 100px;
  }
}
.pannel {
  table {
    width: 100%;
    line-height: 3;
    td {
      position: relative;
      width: calc(100% / 7);
      background-color: lightgreen;
      color: green;
      img {
        position: absolute;
        z-index: 1;
        width: 57px;
        height: 42px;
        bottom: -21px;
        animation: move 1s infinite;
      }
      &.current {
        background-color: lightblue;
        color: blue;
        border: 1px solid blue;
      }
      &.prev,
      &.next {
        background-color: grey;
        color: darkgray;
      }
      &.check_in {
        border: 1px solid palevioletred;
        font-weight: bold;
        background-color: pink;
        color: palevioletred;
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
  cursor: url('@/assets/finger.png'), pointer;
}
</style>
