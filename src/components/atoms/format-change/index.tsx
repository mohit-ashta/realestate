export function formatNumberInLakhsOrCrores(number: number): string {
    const crore = 10000000;
    const lakh = 100000;
  
    if (number >= crore) {
      return  "₹ " + (number / crore).toFixed(1) + " Cr";
    } else if (number >= lakh) {
      return  "₹ " + (number / lakh).toFixed(1) + " Lac";
    } else {
      return number?.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    }
  }
  