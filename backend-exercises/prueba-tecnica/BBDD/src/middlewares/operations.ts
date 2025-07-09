export function Total (addition: number, tax: number) {
    const taxRate = tax / 100;
    tax = addition * taxRate;
    return addition + tax;
}