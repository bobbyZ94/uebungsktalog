import Link from 'next/link';
import Layout from '../components/Layout';

export default function Uebungen() {
  return (
    <Layout title="Übungen">
      <div className="grid grid-cols-1 gap-5 text-center">
        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/muskelgruppen">
              <div className="cursor-pointer">Muskelgruppen</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/uebungstypen">
              <div className="cursor-pointer">Übungstypen</div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/alleuebungen">
              <div className="cursor-pointer">Alle Übungen</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
