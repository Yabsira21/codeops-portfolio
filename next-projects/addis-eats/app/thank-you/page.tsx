import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="mt-2">
      <p>Thank You!!!</p>
      <Link href="/menu">Back to menu</Link>
    </div>
  );
}
