/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Muskelgruppen() {
  return (
    <Layout title="Übungen">
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
          <div className="flex flex-col items-center">
            <Link href="/muskelgruppen/Beine">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Beine</div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/muskelgruppen/Bauch">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Bauch</div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/muskelgruppen/Rücken">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Rücken</div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/muskelgruppen/Brust">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Brust</div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/muskelgruppen/Schultern">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Schultern</div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/muskelgruppen/Arme">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Arme</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
