import Link from 'next/link';
import { useState } from 'react';
import filterAndUnionUebungsnameAndTags from '../functions/filterAndUnionUebungsnameAndTags';

export default function TableAndSearchbox({ uebungen }) {
  const [keyword, setKeyword] = useState('');
  const star = '*';
  return (
    <table className="w-full text-center text-white ">
      <tbody className="">
        <tr className="">
          <th colSpan="5" className="border-b-2 border-white p-3 bg-red-600">
            <h2 className="inline mr-1">Suche:</h2>
            <input
              className="w-40 ss:w-52 focus:outline-none border focus:border-black text-gray-900 text-center p-1"
              value={keyword}
              placeholder="Übungsname/Tag"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </th>
        </tr>
        <tr className="bg-red-600">
          <th className="py-2 px-2 border-white xs:border-r-2 border-b-2 table-cell">
            Übung
          </th>

          <th className="py-2 px-2 border-white ss:border-r-2 hidden ss:table-cell border-b-2">
            Übungstyp
          </th>

          <th className="py-2 px-2 border-white mm:border-r-2 hidden mm:table-cell border-b-2">
            Muskelgruppe
          </th>

          <th className="py-2 px-2 border-white sm:border-r-2 hidden sm:table-cell border-b-2">
            Schwierigkeit
          </th>
          <th className="py-2 px-2 border-white border-b-2 hidden md:table-cell">
            Tags
          </th>
        </tr>
        {uebungen &&
          filterAndUnionUebungsnameAndTags(uebungen, keyword)
            .sort(function (a, b) {
              const textA = a.fields.uebungsname.toUpperCase();
              const textB = b.fields.uebungsname.toUpperCase();
              return textA.localeCompare(textB);
            })
            .map((uebung) => (
              <Link href={`/uebungen/${uebung.fields.slug}`}>
                <tr className="bg-red-200 hover:bg-red-600 text-gray-900 hover:text-white cursor-pointer">
                  <td className="py-2 px-2 border-white xs:border-r-2 border-b-2 table-cell">
                    <div>{uebung.fields.uebungsname}</div>
                  </td>

                  <td className="py-2 px-2 border-white ss:border-r-2 hidden ss:table-cell border-b-2">
                    {uebung.fields.uebungstyp}
                  </td>

                  <td className="py-2 px-2 border-white mm:border-r-2 hidden mm:table-cell border-b-2">
                    {uebung.fields.muskelgruppe.join(', ')}
                  </td>

                  <td className="py-2 px-2 border-gray-50 sm:border-r-2 hidden sm:table-cell border-b-2">
                    {star.repeat(uebung.fields.schwierigkeitsgrad)}
                  </td>

                  <td className="py-2 px-2 border-white border-b-2 hidden md:table-cell">
                    {uebung.fields.tags.join(', ')}
                  </td>
                </tr>
              </Link>
            ))}
      </tbody>
    </table>
  );
}
