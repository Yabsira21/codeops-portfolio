import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "../../_lib/dishes";

export default async function DishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const d = dishes.find((dish) => dish.id === Number(id));

  if (!d) {
    notFound();
  }

  return (
    <div>
      <h1>{d.name}</h1>

      <p>{d.price} ETB</p>

      <p>{d.description}</p>

      {/* unoptimized: images are base64 or external URLs from the data file */}
      <Image
        src={d.img}
        alt={d.name}
        width={400}
        height={300}
        unoptimized
        style={{ margin: "1rem auto", width: "auto" }}
      />

      <Link href="/menu">← Back to menu</Link>
    </div>
  );
}
