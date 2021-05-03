/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Uebungstypen() {
  return (
    <Layout title="Übungen">
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-center">
          <div className="flex flex-col items-center">
            <Link href="/uebungstypen/Frei">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Frei</div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/uebungstypen/Freihantel">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold ursor-pointer">Freihantel</div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/uebungstypen/Maschine">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Maschine</div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/uebungstypen/Cardio">
              <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
                <div className="font-semibold cursor-pointer">Cardio</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
