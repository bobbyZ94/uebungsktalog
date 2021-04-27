import Link from 'next/link';

export default function Header() {
  return (
    <div
      className="text-white font-semibold py-5 px-4 flex bg-red-600
     shadow-lg mt-3 mx-5 rounded-2xl"
    >
      <Link href="/uebungen">Übungskatalog</Link>
    </div>
  );
}
