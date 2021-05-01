/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const backArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
    />
  </svg>
);

export default function Header() {
  const isBigScreen = useMediaQuery({
    query: '(min-device-width: 640px',
  });
  const router = useRouter();
  return (
    <div
      className="text-gray-50 font-semibold py-5 px-4 bg-red-600
     shadow-lg mt-3 mx-5 rounded-2xl flex flex-row items-center justify-between"
    >
      {isBigScreen && (
        <Link href="/uebungen">
          <a>
            <div className="transform hover:scale-110 translate-y-1">
              <Image src="/logo_white_new.png" width="120" height="40" />
            </div>
          </a>
        </Link>
      )}

      <Link href="/uebungen">
        <a>
          <div className="text-base xs:text-xl sm:mr-5 sm:text-2xl transform hover:scale-110">
            Übungskatalog
          </div>
        </a>
      </Link>
      <Link href="/uebungen">
        <a>
          <div
            onClick={() => router.back()}
            className="sm:text-xl text-base transform hover:scale-110"
          >
            <div className="inline-block align-middle mr-1">{backArrow}</div>
            <div className="hidden xs:inline-block align-middle">Zurück</div>
          </div>
        </a>
      </Link>
    </div>
  );
}
