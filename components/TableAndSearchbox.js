import Link from 'next/link';
import { useState } from 'react';
import filterAndUnionUebungsnameAndTags from '../functions/filterAndUnionUebungsnameAndTags';

export default function TableAndSearchbox({ uebungen }) {
  const arrowUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
  const [keyword, setKeyword] = useState('');
  const star = '*';
  const [sortBy, setSortBy] = useState('uebungsnameAlphabetically');
  const [
    sortUebungsnameAlphabetically,
    setSortUebungsnameAlphabetically,
  ] = useState(true);
  const [sortSchwierigkeitsgrad, setSortSchwierigkeitsgrad] = useState(true);
  const [
    sortUebungstypAlphabetically,
    setSortUebungstypAlphabetically,
  ] = useState(true);
  function sortList(a, b) {
    if (sortBy === 'uebungsnameAlphabetically') {
      const textA = a.fields.uebungsname.toUpperCase();
      const textB = b.fields.uebungsname.toUpperCase();
      if (sortUebungsnameAlphabetically) {
        return textA.localeCompare(textB);
      }
      return textB.localeCompare(textA);
    }
    if (sortBy === 'uebungstypAlphabetically') {
      const textA = a.fields.uebungstyp.toUpperCase();
      const textB = b.fields.uebungstyp.toUpperCase();
      if (sortUebungstypAlphabetically) {
        return textA.localeCompare(textB);
      }
      return textB.localeCompare(textA);
    }
    if (sortBy === 'schwierigkeitsgrad') {
      const gradA = a.fields.schwierigkeitsgrad;
      const gradB = b.fields.schwierigkeitsgrad;
      if (sortSchwierigkeitsgrad) {
        return gradA - gradB;
      }
      return gradB - gradA;
    }
  }
  function handleUebungsname() {
    setSortBy('uebungsnameAlphabetically');
    setSortUebungsnameAlphabetically(!sortUebungsnameAlphabetically);
  }
  function handleSchwierigkeitsgrad() {
    setSortBy('schwierigkeitsgrad');
    setSortSchwierigkeitsgrad(!sortSchwierigkeitsgrad);
  }
  function handleUebungstyp() {
    setSortBy('uebungstypAlphabetically');
    setSortUebungstypAlphabetically(!sortUebungstypAlphabetically);
  }
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
          <th
            onClick={handleUebungsname}
            className="cursor-pointer py-2 px-2 border-white xs:border-r-2 border-b-2 table-cell"
          >
            <div className="flex justify-center">
              <div>Übung</div>
              <div className="ml-1 self-center">
                {sortUebungsnameAlphabetically ? arrowDown : arrowUp}
              </div>
            </div>
          </th>

          <th
            onClick={handleUebungstyp}
            className="cursor-pointer py-2 px-2 border-white ss:border-r-2 hidden ss:table-cell border-b-2"
          >
            <div className="flex justify-center">
              <div>Übungstyp</div>
              <div className="ml-1 self-center">
                {sortUebungstypAlphabetically ? arrowDown : arrowUp}
              </div>
            </div>
          </th>

          <th className="py-2 px-2 border-white mm:border-r-2 hidden mm:table-cell border-b-2">
            Muskelgruppe
          </th>

          <th
            onClick={handleSchwierigkeitsgrad}
            className="cursor-pointer py-2 px-2 border-white sm:border-r-2 hidden sm:table-cell border-b-2"
          >
            <div className="flex justify-center">
              <div>Schwierigkeit</div>
              <div className="ml-1 self-center">
                {sortSchwierigkeitsgrad ? arrowDown : arrowUp}
              </div>
            </div>
          </th>
          <th className="py-2 px-2 border-white border-b-2 hidden md:table-cell">
            Tags
          </th>
        </tr>
        {uebungen &&
          filterAndUnionUebungsnameAndTags(uebungen, keyword)
            .sort(sortList)
            .map((uebung) => (
              <Link
                key={uebung.fields.uebungsname}
                href={`/uebungen/${uebung.fields.slug}`}
              >
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
                    {uebung.fields.tags.slice(0, 5).join(', ')}
                  </td>
                </tr>
              </Link>
            ))}
      </tbody>
    </table>
  );
}
