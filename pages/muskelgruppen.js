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
//  * List is alphabetically sorted also
//  * @param {boolean} musclegroupState
//  * @param {Array} uebungenFromContentful
//  * @param {String} musclegroupToMatch
//  * @returns jsx of generated matching musclegroups
//  */
// function generateListWithMatchingMusclegroups(
//   musclegroupState,
//   uebungenFromContentful,
//   musclegroupToMatch
// ) {
//   return (
//     <ul className="text-gray-900">
//       {musclegroupState &&
//         uebungenFromContentful
//           .filter((uebung) =>
//             uebung.fields.muskelgruppe.includes(`${musclegroupToMatch}`)
//           )
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

export default function Muskelgruppen() {
  return (
    <Layout title="Übungen">
      <div className="grid grid-cols-1 gap-5 text-center">
        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/muskelgruppen/Beine">
              <div className="cursor-pointer">Beine</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/muskelgruppen/Bauch">
              <div className="cursor-pointer">Bauch</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/muskelgruppen/Rücken">
              <div className="cursor-pointer">Rücken</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/muskelgruppen/Brust">
              <div className="cursor-pointer">Brust</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/muskelgruppen/Schultern">
              <div className="cursor-pointer">Schultern</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="transform hover:scale-110 flex justify-center items-center cursor-pointer bg-red-600 rounded-2xl shadow-sm w-36 h-12">
            <Link href="/muskelgruppen/Arme">
              <div className="cursor-pointer">Arme</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
