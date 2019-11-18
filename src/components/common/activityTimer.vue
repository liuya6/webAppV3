<template>
  <span>{{ times | activityTime }}</span>
</template>

<script>
export default {
  name: "activityTimer",
  data() {
    return {
      setTimer: "",
      times: ""
    };
  },
  props: {
    time: Number
  },
  created() {
    this.times = this.time;
    console.log(this.times, "this.times");
    this.clearTimer();
    this.startTimer();
  },
  destroyed() {
    this.clearTimer();
  },
  watch: {
    time(newVal) {
      this.times = newVal;
      this.clearTimer();
      if (newVal < 0) {
        return;
      }
      this.startTimer();
    }
  },
  methods: {
    clearTimer() {
      clearInterval(this.setTimer);
      this.setTimer = null;
    },
    startTimer() {
      this.setTimer = setInterval(() => {
        this.times--;
        if (this.times <= 0) {
          this.clearTimer();
          this.$parent.init();
          return "活动已结束";
        }
      }, 1000);
    }
  }
};
</script>
