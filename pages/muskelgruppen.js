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
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <Link href="/muskelgruppen/Beine">
                <div className="font-semibold cursor-pointer">Beine</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <Link href="/muskelgruppen/Bauch">
                <div className="font-semibold cursor-pointer">Bauch</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <Link href="/muskelgruppen/Rücken">
                <div className="font-semibold cursor-pointer">Rücken</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <Link href="/muskelgruppen/Brust">
                <div className="font-semibold cursor-pointer">Brust</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <Link href="/muskelgruppen/Schultern">
                <div className="font-semibold cursor-pointer">Schultern</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <Link href="/muskelgruppen/Arme">
                <div className="font-semibold cursor-pointer">Arme</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
