<template>
  <div class="l_calendar">
    <div class="header">
      <button @click="changeMonth('prev')">上</button>
      <span>{{ year }}年{{ month + 1 }}月</span>
      <button @click="changeMonth('next')">下</button>
    </div>
    <div class="pannel">
      <table>
        <thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
// name > components > mixins > props > data > computed > watch > filter > 钩子函数 > methods
export default {
  name: 'LCalendar',
  data() {
    return {
      current: new Date(2021, 9, 12),
      // current: new Date(),
      year: '',
      month: '', // month + 1 === 当前月份
      day: '', // 一周中的第几天
      date: '', // 一个月的第几天
      dateArr: [],
      checkIn: [
        new Date(2021, 11, 26),
        new Date(2022, 1, 26),
        new Date(2022, 2, 29),
        new Date(2022, 3, 14),
        new Date(2022, 3, 15),
        new Date(2022, 3, 16),
        new Date(2022, 3, 17),
      ],
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
  },
  created() {
    this.year = this.current.getFullYear();
    this.month = this.current.getMonth();
    this.day = this.current.getDay();
    this.date = this.current.getDate();
    this.getCalendar();
  },
  methods: {
    getMonthTotalDay(month) {
      const monthDaysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (this.isLeap) {
        monthDaysArr[1] = 29;
      }
      return monthDaysArr[month];
    },
    getCalendar() {
      const { year, month } = this;
      const monthDays = this.getMonthTotalDay(month);
      const date = new Date(year, month, 1);
      const beginDayOnWeek = date.getDay(); // 1号是周几
      let arr = new Array();
      let temp = 0; // 日期
      const prevMonthDays = this.getMonthTotalDay(month === 0 ? 11 : month - 1);
      let nextMonthBegin = 1;
      let prevMonthWeekDiff = beginDayOnWeek - 1;
      const monthWeeks = this.getWeeks(year, month);
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
    // 一个月有几周
    getWeeks(year, month) {
      const monthDay = this.getMonthTotalDay(month);
      const beginDate = new Date(year, month, 1);
      const endDate = new Date(year, month, monthDay);
      let weekStart = beginDate.getDay();
      let weekEnd = endDate.getDay();
      const firstWeekDays = weekStart === 0 ? 7 : 7 - weekStart;
      const lastWeekDays = weekEnd === 0 ? 7 : weekEnd + 1;
      return 2 + (monthDay - (firstWeekDays + lastWeekDays)) / 7;
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
    dynamicClass(date) {
      let ret = '';
      const { year: currentYear, month: currentMonth } = this;
      let year = currentYear,
        month = currentMonth;
      date = date + '';
      if (date.search('prev') !== -1) {
        date = Number(date.replace('prev', ''));
        ret = 'prev ';
        if (currentMonth === 0) {
          year--;
          month = 11;
        } else {
          month--;
        }
      } else if (date.search('next') !== -1) {
        ret = 'next ';
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

      const dateFull = new Date(year, month, date);
      const checkInArrTime = this.checkIn.map((item) => item.getTime());
      if (checkInArrTime.indexOf(dateFull.getTime()) !== -1) {
        ret += 'check_in ';
      }
      return ret;
    },
  },
};
</script>
<style lang="less" scoped>
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
      width: calc(100% / 7);
      background-color: lightgreen;
      color: green;
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
</style>
