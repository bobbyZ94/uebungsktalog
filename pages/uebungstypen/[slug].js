/* eslint-disable no-shadow */
import Link from 'next/link';
import Layout from '../../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Fetching uebungstypen validation types to generate slug from content model via getContentType() deosn't work dynamically. Had to hardcode, sry
export async function getStaticPaths() {
  const uebungstypenPaths = ['Frei', 'Freihantel', 'Maschine', 'Cardio'];
  return {
    paths: uebungstypenPaths.map((elem) => ({
      params: { slug: elem },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'uebung',
    'fields.uebungstyp': params.slug,
  });
  console.log(params.slug);
  return {
    props: {
      uebungen: data,
      uebungstyp: params.slug,
    },
    revalidate: 60,
  };
}

export default function Post({ uebungen, uebungstyp }) {
  console.log(uebungen);
  function generateTable(uebungen, uebungstyp) {
    return (
      <div className="flex items-center justify-center text-center">
        <table className="">
          <tbody>
            <tr className="bg-red-500">
              <th className="py-1 px-2 border-gray-50 border-r-2 border-b-2">
                Übung
              </th>
              <th className="py-1 px-2 border-gray-50 border-r-2 border-b-2">
                Übungstyp
              </th>
              <th className="py-1 px-2 border-gray-50 border-r-2 border-b-2">
                Muskelgruppe
              </th>
              <th className="py-1 px-2 border-gray-50 border-b-2">
                Schwierigkeit
              </th>
            </tr>
            {uebungen.items
              .sort(function (a, b) {
                const textA = a.fields.uebungsname.toUpperCase();
                const textB = b.fields.uebungsname.toUpperCase();
                return textA.localeCompare(textB);
              })
              .map((uebung) => (
                <Link href={`/uebungen/${uebung.fields.slug}`}>
                  <tr className="bg-red-200 text-gray-900 cursor-pointer">
                    <td className="px-2 border-gray-50 border-r-2 border-b-2">
                      <div>{uebung.fields.uebungsname}</div>
                    </td>
                    <td className="py-1 px-2 border-gray-50 border-r-2 border-b-2">
                      {uebung.fields.uebungstyp}
                    </td>
                    <td className="py-1 px-2 border-gray-50 border-r-2 border-b-2">
                      {uebung.fields.muskelgruppe.join(', ')}
                    </td>
                    <td className="py-1 px-2 border-gray-50 border-b-2">
                      {uebung.fields.schwierigkeitsgrad}
                    </td>
                  </tr>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <Layout title={uebungstyp}>{generateTable(uebungen, uebungstyp)}</Layout>
  );
}
