const monthAnalysis = (messages) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const counts = {};
  const monthsInRange = {};

  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt);

    if (messageDate >= sixMonthsAgo) {
      const year = messageDate.getFullYear();
      const month = messageDate.getMonth();

      const key = `${year}-${month}`;
      if (!counts[key]) {
        counts[key] = 1;
      } else {
        counts[key]++;
      }

      // Keep track of which months have messages in the range
      monthsInRange[key] = true;
    }
  });

  // Fill in missing months with 0 count
  const sixMonthsAgoYear = sixMonthsAgo.getFullYear();
  const sixMonthsAgoMonth = sixMonthsAgo.getMonth();
  let currentDate = new Date(sixMonthsAgoYear, sixMonthsAgoMonth);

  const data = [];
  while (currentDate <= new Date()) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const key = `${year}-${month}`;

    const count = counts[key] || 0;
    const monthName = currentDate.toLocaleDateString("default", {
      month: "short",
    });

    data.push({
      name: monthName,
      value: count,
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return data;
};

const weekAnalysis = (messages) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const counts = {};
  const daysInRange = {};

  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt);

    if (messageDate >= oneWeekAgo) {
      const year = messageDate.getFullYear();
      const month = messageDate.getMonth();
      const day = messageDate.getDate();

      const key = `${year}-${month}-${day}`;
      if (!counts[key]) {
        counts[key] = 1;
      } else {
        counts[key]++;
      }

      // Keep track of which days have messages in the range
      daysInRange[key] = true;
    }
  });

  // Fill in missing days with 0 count
  const oneWeekAgoYear = oneWeekAgo.getFullYear();
  const oneWeekAgoMonth = oneWeekAgo.getMonth();
  const oneWeekAgoDay = oneWeekAgo.getDate();
  let currentDate = new Date(oneWeekAgoYear, oneWeekAgoMonth, oneWeekAgoDay);

  const data = [];
  while (currentDate <= new Date()) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const key = `${year}-${month}-${day}`;

    const count = counts[key] || 0;
    const dayName = currentDate.toLocaleDateString("default", {
      weekday: "short",
    });

    data.push({
      name: dayName,
      value: count,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

export { monthAnalysis, weekAnalysis };
