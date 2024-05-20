export function moneyFormat(amountString: string){
    const amount = parseFloat(amountString);  // Convert string to number

    // Format using locale (e.g., USD for US)
    return amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

export function turnFormattedMoneyStringToNumber(formattedString: string){
    const number = +formattedString.replace(/[^0-9\-+\.]/g, ""); 
    return number
}