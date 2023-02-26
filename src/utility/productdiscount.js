export const calcDiscountPrice = (price, discount) => {
    return Math.round(price - price * discount / 100);
}