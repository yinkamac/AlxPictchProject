import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") 
? JSON.parse
(localStorage.getItem("cart")) 
: {cartItems : []};

const addDecimals = (num) => {
    return (Math.round(num * 100) /100).toFixed(2);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action ) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
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
        },
    },
});

export const { addToCart} = cartSlice.actions;

export default cartSlice.reducer;