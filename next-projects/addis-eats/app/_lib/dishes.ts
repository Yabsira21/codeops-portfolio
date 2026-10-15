import data from "../_data/data.json";
import type { Dish } from "./types";

export const dishes = data as Dish[];

export const categories = ["All", "Main", "Drink"];
