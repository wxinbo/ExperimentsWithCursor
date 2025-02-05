// index.js
Page({
  data: {
    weeks: [],
    totalCheckedDays: 0
  },

  onLoad() {
    this.initCalendar();
  },

  initCalendar() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let weeks = [];
    let week = new Array(7).fill(null).map(() => ({ day: '', checked: false }));

    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      const dayOfWeek = (firstDay + i) % 7;
      week[dayOfWeek] = { day, date: `${year}-${month + 1}-${day}`, checked: false };

      if (dayOfWeek === 6 || day === daysInMonth) {
        weeks.push(week);
        week = new Array(7).fill(null).map(() => ({ day: '', checked: false }));
      }
    }

    this.setData({ weeks });
  },

  toggleDay(e) {
    const date = e.currentTarget.dataset.date;
    const weeks = this.data.weeks.map(week => 
      week.map(day => {
        if (day.date === date) {
          day.checked = !day.checked;
        }
        return day;
      })
    );

    const totalCheckedDays = weeks.reduce((total, week) => 
      total + week.filter(day => day.checked).length, 0
    );

    this.setData({ weeks, totalCheckedDays });
  }
});
