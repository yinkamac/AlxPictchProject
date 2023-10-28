const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    //calculate items price 
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    //CalCulate shipping price (If order is over ₦10000 then free, else ₦1000 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 10000 ? 0 : 1000)

     //CalCulate tax price (7.5% tax )
     state.taxPrice = addDecimals(Number((0.075 * state.itemsPrice).toFixed(2)));


      //CalCulate total price
      state.totalPrice = ( 
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) +
        Number(state.taxPrice)  
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));

      return state;
}