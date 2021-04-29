import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div
      className="text-sm text-gray-50 py-5 flex flex-col items-center bg-red-600
    shadow-2xl mb-3 mx-5 rounded-2xl"
    >
      <div className="mb-2 text-center">
        Übungskatalog des{' '}
        <a
          className="font-bold no-underline hover:underline focus:underline"
          href="https://www.unifit.uni-kl.de/"
        >
          Unifit
        </a>
      </div>
      <div className="mx-2 flex font-semibold">
        <Link href="https://www.uni-kl.de/impressum/">
          <a className="mr-2 text-center no-underline hover:underline focus:underline">
            Impressum
          </a>
        </Link>
        <div>|</div>
        <Link href="https://www.uni-kl.de/datenschutzerklaerung/">
          <a className="ml-2 text-center no-underline hover:underline focus:underline">
            Datenschutz
          </a>
        </Link>
      </div>
      <div className="mt-2"> © {year}</div>
    </div>
  );
}
