<script setup lang="ts">
import {
  ref,
  computed
} from 'vue';

const value = ref('');

const disabledDate = (date: Date) => {
  const dateTime = date.getTime();
  const [start, end] = calendarDateTime.value;

  return computed(() => {
    if (dateTime < start || dateTime > end) {
      return true;
    } else {
      return false;
    }
  });
};

const startHour = ref(0);
const startMinute = ref(0);
const disabledHour = (state: string) => {
  const hours = [];

  for (let i = 0; i < 24; i++) {
    if (i !== startHour.value) {
      hours.push(i);
    }
  }

  return state === 'start' ? [] : hours;
};

const disabledMinute = (hour: number, state: string) => {
  switch (state) {
    case 'start':
      startHour.value = hour;
      return [];

    case 'end':
      const minutes = [];

      for (let i = 0; i < 60; i++) {
        if (i !== startMinute.value) {
          minutes.push(i);
        }
      }
      return minutes;

    default:
      break;
  }
}
const disabledSecond = (_: number, minute: number, state: string) => {
  switch (state) {
    case 'start':
      startMinute.value = minute;
      return [];

    case 'end':
      const seconds = [];

      for (let i = 0; i < 60; i++) {
        // if (i) {
          seconds.push(i);
        // }
      }
      return seconds;

    default:
      break;
  }
}

const calendarDateTime = ref<number[]>([]);

const calendarChange = (date: Date[]) => {
  const [start] = date;
  // 当前的年份
  const year = start.getFullYear();
  // 当前的月份
  const month = start.getMonth();
  // 前一天的日数
  const preDay = start.getDate() - 1;
  // 后一天的日数
  const nextDay = start.getDate() + 1;
  // 前一天的日期
  const preDate = new Date(year, month, preDay);
  // 后一天的日期
  const nextDate = new Date(year, month, nextDay);

  calendarDateTime.value = [preDate.getTime(), nextDate.getTime()];
}

const change = (val: string) => {
  if (!val) {
    value.value = '';
    calendarDateTime.value = [];
  }
}
</script>

<template>
  <div
    flex
    items-center
    justify-center
    p-2
  >
    <el-date-picker
      v-model="value"
      type="datetimerange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      popper-class="time-picker"
      :disabled-date="disabledDate"
      :disabled-hours="disabledHour"
      :disabled-minutes="disabledMinute"
      :disabled-seconds="disabledSecond"
      @calendar-change="calendarChange"
      @change="change"
    />
  </div>
</template>