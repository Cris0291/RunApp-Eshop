export default function isValidExpirationDate(
  expirationDate: string
): boolean | string {
  let expiryDate: Date;

  if (expirationDate.length === 5) {
    // MM/YY format
    // Extract the month and year (YY) from the expiration date
    const month = expirationDate.substring(0, 2);
    const year = "20" + expirationDate.substring(3, 5); // Form full year as "20YY"

    // Construct a date using the first day of the month
    const fullDate = `${year}-${month}-01`;

    expiryDate = new Date(fullDate);

    // Check if the date is valid and not in the past
    return (
      (!isNaN(expiryDate.getTime()) && expiryDate >= new Date()) ||
      "Expiration date cannot be in the past."
    );
  } else if (expirationDate.length === 7) {
    const [month, year] = expirationDate.split("/");
    const fullDate = `${year}-${month}-01`; // Correctly formatted for JavaScript Date

    expiryDate = new Date(fullDate);
    // Check if the date is valid and not in the past
    return (
      (!isNaN(expiryDate.getTime()) && expiryDate >= new Date()) ||
      "Expiration date cannot be in the past."
    );
  }

  return false || "Expiration date cannot be in the past."; // Invalid format
}
