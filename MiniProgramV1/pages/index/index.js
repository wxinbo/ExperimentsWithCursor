// index.js
Page({
  data: {
    calendar: [], // 存储日历数据
    totalDays: 0, // 当前月份运动总天数
    currentDate: '',
    totalDaysInYear: 365 // 假设一年有365天
  },

  onLoad: function() {
    this.initCalendar();
    this.setCurrentDate(); // 设置当前日期
    this.calculateTotalDays(); // 更新总天数
  },

  round: function(value, decimals) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },    

  initCalendar: function() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 获取该月第一天是星期几
  
    const calendar = Array.from({ length: firstDay }, () => ({ day: '', isChecked: false, isValid: false })) // 填充空白
      .concat(Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const isValid = day >= 1; // 这里可以设置无效日期的条件
        return {
          day: day,
          isChecked: false,
          isValid: isValid // 添加 isValid 属性
        };
      }));
  
    this.setData({ calendar });
  },

  goToLastMonth: function() {
    const date = new Date(this.data.currentDate);
    date.setMonth(date.getMonth() - 1); // 切换到上个月
    this.setCurrentDate(date);
    this.initCalendar(); // 重新初始化日历
  },
  
  goToNextMonth: function() {
    console.log("切换到下个月");
    const date = new Date(this.data.currentDate);
    date.setMonth(date.getMonth() + 1); // 切换到下个月
    this.setCurrentDate(date);
    this.initCalendar(); // 重新初始化日历
  },

  setCurrentDate: function() {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    this.setData({ currentDate: formattedDate });
  },
  

  toggleCheck: function(e) {
    const day = e.currentTarget.dataset.day;
    const calendar = this.data.calendar.map(item => {
      if (item.day === day) {
        item.isChecked = !item.isChecked; // 切换打卡状态
      }
      return item;
    });
    this.setData({ calendar });
    this.updateTotalDays();
  },

  updateTotalDays: function() {
    const totalDays = this.data.calendar.filter(item => item.isChecked).length;
    this.setData({ totalDays });
  }
});
