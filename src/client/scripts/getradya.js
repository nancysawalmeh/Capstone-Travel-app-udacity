const axios = require("axios");
const getradya = (date) => {
  const nowDate = new Date();
  const travelDate = new Date(date);
  if (isNaN(travelDate.getTime())) {
    return {
      error: true,
      message: "Invalid date format. Please provide a valid date."
    };
  }

  const timeDiff = travelDate.getTime() - nowDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff === -0 ? 0 : daysDiff;
};

module.exports = { getradya };
