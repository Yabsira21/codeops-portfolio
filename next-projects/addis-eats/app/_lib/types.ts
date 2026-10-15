export type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  img: string;
  spicy: boolean;
};

export type CartItem = {
  item: Pick<Dish, "id" | "name" | "price" | "spicy">;
  qty: number;
};
