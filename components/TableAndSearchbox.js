import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { useState } from 'react';
import filterAndUnionUebungsnameAndTags from '../functions/filterAndUnionUebungsnameAndTags';

export default function TableAndSearchbox({ uebungen, tableName }) {
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
  const isVeryBigScreen = useMediaQuery({
    query: '(min-device-width: 600px',
  });
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="bg-red-500 mb-5">
        <div className="font-semibold p-1">Suche</div>
        <input
          className="focus:outline-none text-gray-900 text-center p-1 border-2 border-red-500"
          value={keyword}
          placeholder="Übungsname/Tag"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div>
        <table className="">
          <tbody className="">
            <tr className="">
              <th
                colSpan="5"
                className="border-b-2 border-gray-50 py-2 px-2 bg-red-500 font-extrabold text-base xs:text-xl sm:text-2xl"
              >
                {tableName}
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
                <th
                  className={`py-1 px-2 border-gray-50 ${
                    isVeryBigScreen && 'border-r-2'
                  } border-b-2`}
                >
                  Schwierigkeit
                </th>
              )}
              {isVeryBigScreen && (
                <th className="py-1 px-2 border-gray-50 border-b-2">Tags</th>
              )}
            </tr>
            {filterAndUnionUebungsnameAndTags(uebungen, keyword)
              .sort(function (a, b) {
                const textA = a.fields.uebungsname.toUpperCase();
                const textB = b.fields.uebungsname.toUpperCase();
                return textA.localeCompare(textB);
              })
              .map((uebung) => (
                <Link href={`/uebungen/${uebung.fields.slug}`}>
                  <tr className="bg-red-200 hover:bg-red-500 text-gray-900 hover:text-gray-50 cursor-pointer">
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
                      <td
                        className={`py-1 px-2 border-gray-50 ${
                          isVeryBigScreen && 'border-r-2'
                        } border-b-2`}
                      >
                        {uebung.fields.schwierigkeitsgrad}
                      </td>
                    )}
                    {isVeryBigScreen && (
                      <td className="py-1 px-2 border-gray-50 border-b-2">
                        {uebung.fields.tags.join(', ')}
                      </td>
                    )}
                  </tr>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
