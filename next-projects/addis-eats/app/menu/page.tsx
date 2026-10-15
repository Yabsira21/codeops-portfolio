"use client";

import Dish from "../_components/Dish";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "main", "drink"];

  const dish = [
    {
      id: 1,
      name: "Buna",
      price: 80,
      description: "Traditional Ethiopian coffee",
      category: "Drink",
      img: "...",
      spicy: false,
    },
    {
      id: 2,
      name: "Shiro",
      price: 150,
      description: "Traditional Ethiopian chickpea stew",
      category: "Main",
      img: "...",
      spicy: true,
    },
    {
      id: 3,
      name: "Coca",
      price: 50,
      description: "Lorem ipsum dolor sit amet",
      category: "Drink",
      img: "...",
      spicy: false,
    },
    {
      id: 4,
      name: "Kitfo",
      price: 1000,
      description: "Lorem ipsum dolor sit amet",
      category: "Main",
      img: "...",
      spicy: true,
    },
    {
      id: 5,
      name: "Mirinda",
      price: 60,
      description: "Lorem ipsum dolor sit amet",
      category: "Drink",
      img: "...",
      spicy: false,
    },
  ];

  const filteredDishes =
    selectedCategory === "all"
      ? dish
      : dish.filter((d) => d.category.toLowerCase() === selectedCategory);

  return (
    <>
      <form className="flex justify-center my-3">
        <input
          placeholder="search"
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200"
        />
      </form>

      <div className="flex justify-center mb-3">
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setSelectedCategory(c)}
            className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none ml-2 mr-2"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="menu">
        {filteredDishes.map((d) => (
          <Dish
            key={d.id}
            id={d.id}
            name={d.name}
            price={d.price}
            spicy={d.spicy}
          />
        ))}
      </div>

      <Link className="text-center" href="/cart">
        Cart
      </Link>
    </>
  );
}
