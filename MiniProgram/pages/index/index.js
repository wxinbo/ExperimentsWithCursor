// index.js
Page({
  data: {
    days: [],
    marks: [],
    currentInput: '',
    currentDate: '',
    totalDays: 0
  },

  onLoad: function() {
    this.initializeCalendar();
    this.setCurrentDate();
  },

  initializeCalendar: function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 获取当前月份的天数
    const firstDay = new Date(year, month, 1).getDay(); // 获取当前月份第一天是星期几

    const days = [];
    // 填充空白
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: '', selected: false }); // 空白日期
    }
    // 填充实际日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, selected: false });
    }
    this.setData({ days });
    this.updateTotalDays();
  },

  setCurrentDate: function() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    this.setData({ currentDate: date.toLocaleDateString('zh-CN', options) });
  },

  selectDay: function(event) {
    const date = event.currentTarget.dataset.date;
    const days = this.data.days.map(day => {
      if (day.date === date) {
        day.selected = !day.selected;
      }
      return day;
    });
    this.setData({ days });
    this.updateTotalDays();
  },

  updateTotalDays: function() {
    const totalDays = this.data.days.filter(day => day.selected).length;
    this.setData({ totalDays });
  },

  onInput: function(event) {
    this.setData({ currentInput: event.detail.value });
  },

  addMark: function() {
    if (this.data.currentInput) {
      const selectedDate = this.data.days.find(day => day.selected);
      if (selectedDate) {
        this.setData({
          marks: [...this.data.marks, { date: selectedDate.date, text: this.data.currentInput }],
          currentInput: ''
        });
      }
    }
  },

  prevMonth: function() {
    const date = new Date(this.data.currentDate);
    date.setMonth(date.getMonth() - 1); // 减去一个月
    this.setData({
      currentDate: date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
    this.initializeCalendar(); // 重新初始化日历
  },

  nextMonth: function() {
    const date = new Date(this.data.currentDate);
    date.setMonth(date.getMonth() + 1); // 加上一个月
    this.setData({
      currentDate: date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
    this.initializeCalendar(); // 重新初始化日历
  }
});
