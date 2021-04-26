import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div
      className="text-sm text-white py-5 flex flex-col items-center bg-red-600
    shadow-2xl mb-3 mx-5 rounded-2xl"
    >
      <div className="mb-2 text-center">
        Made with{' '}
        <a
          className="font-bold no-underline hover:underline focus:underline"
          href="https://nextjs.org/"
        >
          Next.js
        </a>
        ,{' '}
        <a
          className="font-semibold no-underline hover:underline focus:underline"
          href="https://tailwindcss.com/"
        >
          Tailwindcss
        </a>{' '}
        and{' '}
        <a
          className="font-semibold no-underline hover:underline focus:underline"
          href="https://www.contentful.com/"
        >
          Contentful
        </a>
      </div>
      <div className="mx-2 flex font-semibold">
        <Link href="/impressum">
          <a className="mr-2 text-center no-underline hover:underline focus:underline">
            Legal Notice - Impressum
          </a>
        </Link>
        <div>|</div>
        <Link href="/privacy">
          <a className="ml-2 text-center no-underline hover:underline focus:underline">
            Privacy - Datenschutz
          </a>
        </Link>
      </div>
      <div className="mt-2"> © {year}</div>
    </div>
  );
}
