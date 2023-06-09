const formatDateDifference = (timestamp: Date) => {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);
  const timeDifference = currentDate.getTime() - previousDate.getTime();

  const minutes = Math.floor(timeDifference / 60000);
  if (minutes < 60) {
    return `${minutes} წუთის წინ`;
  }

  const hours = Math.floor(timeDifference / 3600000);
  if (hours < 24) {
    return `${hours} საათის წინ`;
  }

  const days = Math.floor(timeDifference / 86400000);
  return `${days} დღის წინ`;
};
export default formatDateDifference;
