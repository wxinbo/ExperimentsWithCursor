// index.js
Page({
  data: {
    days: [],
    marks: [],
    currentInput: '',
    currentDate: '',
    totalDays: 0,
    previousDays: []
  },

  onLoad: function() {
    this.initializeCalendar();
    this.setCurrentDate();
  },

  initializeCalendar: function(date, previousDays) {
    // 如果 date 为空，则使用当前日期
    if (!date) {
      date = new Date();
    }

    if(!previousDays){
      previousDays = this.data.previousDays;
    }

    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 获取当前月份的天数

    const firstDay = new Date(year, month, 1).getDay(); // 获取当前月份第一天是星期几

    const days = [];
    // 填充空白
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: '', selected: false, showDate:'' }); // 空白日期
    }
    // 填充实际日期
    for (let i = 1; i <= daysInMonth; i++) {

      const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`; // 生成 yyyy-MM-dd 格式的键
      // 检查之前的选中状态
      if(previousDays.find(day => day.date === dateKey)){
        days.push({ date: dateKey, selected: true, showDate:i });
      }
      else{
        days.push({ date: dateKey, selected: false, showDate:i });
      }
    }
    this.setData({ days });
    this.updateTotalDays();
    this.updatePreviousDays();
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
        this.data.previousDays.push(day);
        console.log("previousDays");
        console.log(this.data.previousDays);
      }
      return day;
    });
    this.setData({ days });
    this.updateTotalDays();
    this.updatePreviousDays();
  },


  updateTotalDays: function() {
    const totalDays = this.data.days.filter(day => day.selected).length;
    this.setData({ totalDays });
  },
  updatePreviousDays: function() {
    const previousDays = this.data.previousDays;
    this.setData({previousDays})
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
    const dateParts = this.data.currentDate.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (dateParts) {
      const date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]); // 月份从0开始
      date.setMonth(date.getMonth() - 1); // 减去一个月
      this.setData({
        currentDate: date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      });
      this.initializeCalendar(date, this.data.previousDays); // 重新初始化日历
    }
  },

  nextMonth: function() {
    const dateParts = this.data.currentDate.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (dateParts) {
      const date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]); // 月份从0开始
      date.setMonth(date.getMonth() + 1); // 加上一个月
      this.setData({
        currentDate: date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      });
      this.initializeCalendar(date, this.data.previousDays); // 重新初始化日历
    }
  }
});
