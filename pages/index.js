import Link from 'next/link';
import Layout from '../components/Layout';

export default function Index() {
  return (
    <Layout title="Übungen">
      <div className="grid grid-cols-1 gap-5 text-center">
        <div className="flex flex-col items-center">
          <Link href="/muskelgruppen">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <div className="font-semibold cursor-pointer">Muskelgruppen</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <Link href="/uebungstypen">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <div className="font-semibold cursor-pointer">Übungstypen</div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Link href="/alleuebungen">
            <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
              <div className="font-semibold cursor-pointer">Alle Übungen</div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
