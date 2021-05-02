/* eslint-disable no-shadow */
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import Layout from '../../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Fetching muskelgruppen validation types to generate slug from content model via getContentType() deosn't work dynamically. Had to hardcode, sry
export async function getStaticPaths() {
  const muskelgruppenPaths = [
    'Beine',
    'Bauch',
    'Rücken',
    'Brust',
    'Schultern',
    'Arme',
  ];
  return {
    paths: muskelgruppenPaths.map((elem) => ({
      params: { slug: elem },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'uebung',
    'fields.muskelgruppe': params.slug,
  });
  return {
    props: {
      uebungen: data,
      muskelgruppe: params.slug,
    },
    revalidate: 60,
  };
}

export default function Uebungen({ uebungen, muskelgruppe }) {
  const [keyword, setKeyword] = useState('');
  const isVerySmallScreen = useMediaQuery({
    query: '(min-device-width: 300px',
  });
  const isSmallScreen = useMediaQuery({
    query: '(min-device-width: 400px',
  });
  const isBigScreen = useMediaQuery({
    query: '(min-device-width: 500px',
  });
  function generateTable(uebungen) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-gray-900">
          Suche nach Übungsname oder Tags:
          <input
            className="border-2 border-black"
            value={keyword}
            placeholder="Übungsname oder Tag"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <table className="">
          <tbody>
            <tr className="">
              <th
                colSpan="4"
                className="border-b-2 border-gray-50 py-2 px-2 bg-red-500 font-extrabold text-base xs:text-xl sm:text-2xl"
              >
                {muskelgruppe}
              </th>
            </tr>
            <tr className="bg-red-500">
              <th
                className={`py-1 px-2 border-gray-50 ${
                  isVerySmallScreen && 'border-r-2'
                } border-b-2`}
              >
                Übung
              </th>
              {isVerySmallScreen && (
                <th
                  className={`py-1 px-2 border-gray-50 ${
                    isSmallScreen && 'border-r-2'
                  } border-b-2`}
                >
                  Übungstyp
                </th>
              )}
              {isSmallScreen && (
                <th
                  className={`py-1 px-2 border-gray-50 ${
                    isBigScreen && 'border-r-2'
                  } border-b-2`}
                >
                  Muskelgruppe
                </th>
              )}
              {isBigScreen && (
                <th className="py-1 px-2 border-gray-50 border-b-2">
                  Schwierigkeit
                </th>
              )}
            </tr>
            {uebungen.items
              .filter((uebung) =>
                uebung.fields.uebungsname
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              )
              .sort(function (a, b) {
                const textA = a.fields.uebungsname.toUpperCase();
                const textB = b.fields.uebungsname.toUpperCase();
                return textA.localeCompare(textB);
              })
              .map((uebung) => (
                <Link href={`/uebungen/${uebung.fields.slug}`}>
                  <tr className="bg-red-200 text-gray-900 cursor-pointer">
                    <td
                      className={`py-1 px-2 border-gray-50 ${
                        isVerySmallScreen && 'border-r-2'
                      } border-b-2`}
                    >
                      <div>{uebung.fields.uebungsname}</div>
                    </td>
                    {isVerySmallScreen && (
                      <td
                        className={`py-1 px-2 border-gray-50 ${
                          isSmallScreen && 'border-r-2'
                        } border-b-2`}
                      >
                        {uebung.fields.uebungstyp}
                      </td>
                    )}
                    {isSmallScreen && (
                      <td
                        className={`py-1 px-2 border-gray-50 ${
                          isBigScreen && 'border-r-2'
                        } border-b-2`}
                      >
                        {uebung.fields.muskelgruppe.join(', ')}
                      </td>
                    )}
                    {isBigScreen && (
                      <td className="py-1 px-2 border-gray-50 border-b-2">
                        {uebung.fields.schwierigkeitsgrad}
                      </td>
                    )}
                  </tr>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <Layout title={muskelgruppe}>{generateTable(uebungen)}</Layout>;
}
