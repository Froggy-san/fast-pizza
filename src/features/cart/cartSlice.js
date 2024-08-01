import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

// one of the state management principles which when ever possible we should derive  state , and that is the reason why we are not storing (totalPrice or the numItems) becasue that would need of us to keep them on sync while updating state

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem which is an object

      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      // payload = pizzaId

      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      console.log(state.cart, "state cart from slice <<<<");
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreasItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // i don't really understand this code, but what we did is we checked if the quantity in an item is == 0  then we call the deleteitem funcion by using caseReducer .
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  decreasItemQuantity,
  increaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// NOTE Redux recommends to us that when we derive state from a slice we use function right away into the selector, so in the cartOverview we did use it in side the  selector , but we removed it and put it here , it's a convention to start the function name with a (get) . btw i left the code in the cartOverview file so you can see how it looked before we moved the fucntion from it i hope am being clear here . good luck .

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, currEl) => sum + currEl.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, currEl) => sum + currEl.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// !NOTE , having those selector fucntions like we have up above ^  , could coause performance issues , so if we need to opptimise the performance we need a libarary called "reselect" .
