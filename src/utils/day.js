export const formatDateToDDMMYYYYHHMMSS = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và đảm bảo có 2 chữ số (lưu ý tháng bắt đầu từ 0)
  const year = date.getFullYear().toString(); // Lấy năm

  const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ và đảm bảo có 2 chữ số
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút và đảm bảo có 2 chữ số
  const seconds = date.getSeconds().toString().padStart(2, "0"); // Lấy giây và đảm bảo có 2 chữ số

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
