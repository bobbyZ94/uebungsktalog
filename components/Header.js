import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

export default function Header() {
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 640px)' });
  const isSmallScreen = useMediaQuery({ query: '(min-device-width: 400px)' });
  return (
    <div
      className={`text-gray-50 py-5 px-4 bg-red-600
     shadow-lg mt-3 mx-5 rounded-2xl grid ss:grid-cols-3 ${
       isSmallScreen ? 'grid-cols-2' : 'grid-cols-1'
     } justify-center items-center`}
    >
      {isSmallScreen && (
        <div className="">
          <Image
            src="/logo_white_new.png"
            width={`${isBigScreen ? '120' : '90'}`}
            height={`${isBigScreen ? '40' : '30'}`}
          />
        </div>
      )}
      <div className="text-center font-semibold text-xl ss:text-2xl sm:mr-5 sm:text-3xl">
        ÜBUNGSKATALOG
      </div>
    </div>
  );
}
