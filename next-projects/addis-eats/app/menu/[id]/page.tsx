import Image from "next/image";
import { notFound } from "next/navigation";

const dish = [
  {
    id: 1,
    name: "Buna",
    price: 80,
    description: "Traditional Ethiopian coffee",
    category: "Drink",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhJLOcOjJdYbwaRqqpnn2hh1U5l04wV1hfRaVQ6t0v9z-PEUBra_nC-G4&s=10",
    spicy: false,
  },
  {
    id: 2,
    name: "Shiro",
    price: 150,
    description: "Traditional Ethiopian chickpea stew",
    category: "Main",
    img: "data:image/jpeg;base64,...",
    spicy: true,
  },
  {
    id: 3,
    name: "Coca",
    price: 50,
    description: "Lorem ipsum dolor sit amet",
    category: "Drink",
    img: "data:image/jpeg;base64,...",
    spicy: false,
  },
  {
    id: 4,
    name: "Kitfo",
    price: 1000,
    description: "Lorem ipsum dolor sit amet,",
    category: "Main",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaV7jzMkjffXy4ifz2Pt7z5NYqhb2E0sDo4GZlH47KQ&s=10",
    spicy: true,
  },
  {
    id: 5,
    name: "Mirinda",
    price: 60,
    description: "Lorem ipsum dolor sit amet,",
    category: "Drink",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXbPvi_LaWWjl0CbvjgSYqJBJCrqh2HLtD-36v7E5dZQ&s=10",
    spicy: false,
  },
];

export default async function DishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const d = dish.find((d) => d.id === Number(id));

  if (!d) {
    notFound();
  }

  return (
    <div>
      <h1>{d.name}</h1>

      <p>{d.price} ETB</p>

      <p>{d.description}</p>

      <Image src={d.img} alt={d.name} width={400} height={300} />
    </div>
  );
}
