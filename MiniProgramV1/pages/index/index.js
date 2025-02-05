// index.js
Page({
  data: {
    calendar: [], // 存储日历数据
    totalDays: 0, // 当前月份运动总天数
    currentDate: ''
  },

  onLoad: function() {
    this.initCalendar();
    this.setCurrentDate(); // 设置当前日期
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
