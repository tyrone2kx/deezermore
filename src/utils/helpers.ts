export const secondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};


export const formatNumber = (number) => {
  if (number >= 1000000) {
    const millions = number / 1000000;
    return millions.toFixed(1) + 'M';
  } else if (number >= 1000) {
    const thousands = number / 1000;
    return thousands.toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}