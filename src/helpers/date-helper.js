export const convertDateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000);
  };

  // Convert a Unix timestamp to a date
  // Example: convertUnixTimestampToDate(1612276800) => "2/2/2021"
  
  export const convertUnixTimestampToDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    return new Date(milliseconds).toLocaleDateString();
  };
  
  // Create a date from a given date and a number of days, weeks, months, and years
    // Example: createDate(new Date(), 0, 0, 0, -1) => "1/2/2021"
    
  export const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  };

  export const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString();
  };

  export const getRelevantDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time to the start of the day

    const oneWeekAgo = createDate(today, 0, -1, 0, 0);
    const oneMonthAgo = createDate(today, 0, 0, -1, 0);
    const oneYearAgo = createDate(today, 0, 0, 0, -1);

    return {
        today: convertDateToUnixTimestamp(today),
        oneWeekAgo: convertDateToUnixTimestamp(oneWeekAgo),
        oneMonthAgo: convertDateToUnixTimestamp(oneMonthAgo),
        oneYearAgo: convertDateToUnixTimestamp(oneYearAgo)
    };
};