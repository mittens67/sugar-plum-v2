// lib/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartProduct = {
  id: number;
  item_name: string;
  base_price: number;
  image_small: string;
  quantity: number;

  // uniqueness
  flavor_id?: number | null;
  package_size_id?: number | null;

  // display
  flavor_name?: string | null;
  package_size_label?: string | null;
};

interface CartState {
  products: CartProduct[];
  productsNumber: number;
}

type CartIdentifier = {
  id: number;
  flavor_id?: number | null;
  package_size_id?: number | null;
};

const initialState: CartState = {
  products: [],
  productsNumber: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingProduct = state.products.find(
        (p) =>
          p.id === action.payload.id &&
          p.flavor_id === action.payload.flavor_id &&
          p.package_size_id === action.payload.package_size_id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.productsNumber++;
      }
    },

    removeFromCart: (state, action: PayloadAction<CartIdentifier>) => {
      const index = state.products.findIndex(
        (p) =>
          p.id === action.payload.id &&
          p.flavor_id === action.payload.flavor_id &&
          p.package_size_id === action.payload.package_size_id
      );
      if (index !== -1) {
        state.products.splice(index, 1);
        state.productsNumber--;
      }
    },

    incrementInCart: (state, action: PayloadAction<CartIdentifier>) => {
      const product = state.products.find(
        (p) =>
          p.id === action.payload.id &&
          p.flavor_id === action.payload.flavor_id &&
          p.package_size_id === action.payload.package_size_id
      );
      if (product) {
        product.quantity += 1;
      }
    },

    decrementInCart: (state, action: PayloadAction<CartIdentifier>) => {
      const index = state.products.findIndex(
        (p) =>
          p.id === action.payload.id &&
          p.flavor_id === action.payload.flavor_id &&
          p.package_size_id === action.payload.package_size_id
      );

      if (index !== -1) {
        const product = state.products[index];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          // remove completely when quantity hits 0
          state.products.splice(index, 1);
          state.productsNumber--;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementInCart, decrementInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
