/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

// const client = require('contentful').createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// });

// // runs during build time; returns props which will get passed down to Muskelgruppen component
// export async function getStaticProps() {
//   const data = await client.getEntries({
//     content_type: 'uebung',
//   });
//   return {
//     props: {
//       uebungen: data.items,
//     },
//     revalidate: 60,
//   };
// }

// /**
//  *
//  * @param {boolean} musclegroupState
//  * @param {Array} uebungenFromContentful
//  * @param {String} musclegroupToMatch
//  * @returns jsx of generated matching uebungstyp
//  */
// function generateListWithMatchingUebungstyp(
//   uebungstypState,
//   uebungenFromContentful,
//   uebungstypToMatch
// ) {
//   return (
//     <ul className="text-gray-900">
//       {uebungstypState &&
//         uebungenFromContentful
//           .filter((uebung) => uebung.fields.uebungstyp === uebungstypToMatch)
//           .sort(function (a, b) {
//             const textA = a.fields.uebungsname.toUpperCase();
//             const textB = b.fields.uebungsname.toUpperCase();
//             return textA.localeCompare(textB);
//           })
//           .map((matchedUebung) => (
//             <li>
//               <Link href={`/uebungen/${matchedUebung.fields.slug}`}>
//                 <a>
//                   <div>- {matchedUebung.fields.uebungsname}</div>
//                 </a>
//               </Link>
//             </li>
//           ))}
//     </ul>
//   );
// }

// TODO: Freie Übungen hinzufügen
export default function Uebungstypen() {
  return (
    <Layout title="Übungen">
      <div className="grid grid-cols-1 gap-5 text-center">
        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/uebungstypen/Frei">
              <div className="cursor-pointer">Frei</div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/uebungstypen/Freihantel">
              <div className="cursor-pointer">Freihantel</div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/uebungstypen/Maschine">
              <div className="cursor-pointer">Maschine</div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/uebungstypen/Cardio">
              <div className="cursor-pointer">Cardio</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
