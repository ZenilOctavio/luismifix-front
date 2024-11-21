
/**
 * Formats a given string representation of a monetary amount into a localized currency format.
 *
 * @param {string} amountString - The string representation of the amount to be formatted. 
 *                                 It should be a valid number in string format (e.g., "1234.56").
 * 
 * @returns {string} The formatted currency string in Mexican Pesos (MXN).
 * 
 * @throws {Error} Throws an error if the input string cannot be parsed as a valid number.
 * 
 * @example
 * 
 * const formattedAmount = moneyFormat("1234.56");
 * console.log(formattedAmount); // Outputs: "$1,234.56"
 */
export function moneyFormat(amountString: string) {
    const amount = parseFloat(amountString);  // Convert string to number

    // Format using locale (e.g., USD for US)
    return amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

/**
 * Converts a formatted currency string back into a numerical value.
 *
 * This function removes any non-numeric characters (except for the decimal point and negative sign)
 * from the input string and converts the resulting string into a number.
 *
 * @param {string} formattedString - The formatted currency string to be converted (e.g., "$1,234.56").
 * 
 * @returns {number} The numeric value represented by the formatted string.
 * 
 * @example
 * 
 * const numberValue = turnFormattedMoneyStringToNumber("$1,234.56");
 * console.log(numberValue); // Outputs: 1234.56
 */
export function turnFormattedMoneyStringToNumber(formattedString: string) {
    const number = +formattedString.replace(/[^0-9\-+\.]/g, "");
    return number
}

export function isValidUrl(stringToEvaluate: string) {
    // Regular expression to match valid URL format
    const urlRegex = /^(http|https):\/\/[\w.-]+(?:[:\d]*\/)[\w .\/?#]*$/;
    return urlRegex.test(stringToEvaluate);
}
export function isValidUrl(stringToEvaluate: string) {
    // Regular expression to match valid URL format
    const urlRegex = /^(http|https):\/\/[\w.-]+(?:[:\d]*\/)[\w .\/?#]*$/;
    return urlRegex.test(stringToEvaluate);
}