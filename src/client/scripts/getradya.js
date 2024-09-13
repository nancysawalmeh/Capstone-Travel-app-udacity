const axios = require("axios");

// Function to calculate the difference in days between the current date and a given travel date
const getradya = (date) => {
  const nowDate = new Date();
  const travelDate = new Date(date);

  // Check if the provided date is valid
  if (isNaN(travelDate.getTime())) {
    return {
      error: true,
      message: "Invalid date format. Please provide a valid date."
    };
  }
  /* Calculate the time difference between the travel date and the current date
   and Convert the time difference from milliseconds to days and
   Return the difference in days, ensuring it is not negative zero*/
  const timeDiff = travelDate.getTime() - nowDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff === -0 ? 0 : daysDiff;
};
module.exports = { getradya };
