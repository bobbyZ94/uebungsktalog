/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TabelAndSearchbox from '../components/TableAndSearchbox';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'uebung',
  });
  return {
    props: {
      uebungen: data,
    },
    revalidate: 60,
  };
}

export default function Index({ uebungen }) {
  const [uebungstyp, setUebungstyp] = useState('Alle');
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({
    Beine: true,
    Bauch: true,
    Ruecken: true,
    Brust: true,
    Schultern: true,
    Arme: true,
  });

  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const selectAll = (value) => {
    setCheckedAll(value);
    setChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };

  useEffect(() => {
    let allChecked = true;
    for (const inputName in checked) {
      if (checked[inputName] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  function filterUebungen(uebungen) {
    if (checkedAll && uebungstyp === 'Alle') {
      return uebungen.items;
    }
    let result = [];
    if (uebungstyp === 'Alle') {
      result = uebungen.items;
    } else {
      result = uebungen.items.filter(
        (uebungen) => uebungen.fields.uebungstyp === uebungstyp
      );
    }
    let resultMuskelgruppen = [];
    if (checked.Beine) {
      const filter = result.filter((uebungen) =>
        uebungen.fields.muskelgruppe.includes('Beine')
      );
      resultMuskelgruppen = [...resultMuskelgruppen, ...filter];
    }
    if (checked.Bauch) {
      const filter = result.filter((uebungen) =>
        uebungen.fields.muskelgruppe.includes('Bauch')
      );
      resultMuskelgruppen = [...resultMuskelgruppen, ...filter];
    }
    if (checked.Ruecken) {
      const filter = result.filter((uebungen) =>
        uebungen.fields.muskelgruppe.includes('Rücken')
      );
      resultMuskelgruppen = [...resultMuskelgruppen, ...filter];
    }
    if (checked.Brust) {
      const filter = result.filter((uebungen) =>
        uebungen.fields.muskelgruppe.includes('Brust')
      );
      resultMuskelgruppen = [...resultMuskelgruppen, ...filter];
    }
    if (checked.Schultern) {
      const filter = result.filter((uebungen) =>
        uebungen.fields.muskelgruppe.includes('Schultern')
      );
      resultMuskelgruppen = [...resultMuskelgruppen, ...filter];
    }
    if (checked.Arme) {
      const filter = result.filter((uebungen) =>
        uebungen.fields.muskelgruppe.includes('Arme')
      );
      resultMuskelgruppen = [...resultMuskelgruppen, ...filter];
    }

    return resultMuskelgruppen;
  }

  return (
    <Layout>
      <div className="grid xl:grid-cols-4 w-full h-full">
        <div className="justify-self-middle place-self-center mb-5 xl:mb-0">
          <div className="shadow-2xl rounded-2xl xl:mr-5 text-white bg-red-600 flex flex-col items-center justify-center gap-5 p-4">
            <div>
              <span className="font-semibold mr-2">Übungstyp:</span>
              <select
                className="text-gray-900 w-48 h-9 border-none focus:outline-none appearance-none"
                value={uebungstyp}
                onChange={(e) => setUebungstyp(e.target.value)}
              >
                <option value="Alle">Alle Übungstypen</option>
                <option value="Frei">Frei</option>
                <option value="Freihantel">Freihantel</option>
                <option value="Maschine">Maschine</option>
                <option value="Cardio">Cardio</option>
              </select>
            </div>

            <div>
              <span className="font-semibold mr-2">Muskelgruppe:</span>
              <div className="grid grid-cols-2 ss:grid-cols-3 xl:grid-cols-1 gap-x-2">
                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Beine"
                    type="checkbox"
                    checked={checked.Beine}
                    onChange={() => toggleCheck('Beine')}
                  />
                  <lable className="ml-1 align-middle">Beine</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Bauch"
                    type="checkbox"
                    checked={checked.Bauch}
                    onChange={() => toggleCheck('Bauch')}
                  />
                  <lable className="ml-1 align-middle">Bauch</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Rücken"
                    type="checkbox"
                    checked={checked.Ruecken}
                    onChange={() => toggleCheck('Ruecken')}
                  />
                  <lable className="ml-1 align-middle">Rücken</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Brust"
                    type="checkbox"
                    checked={checked.Brust}
                    onChange={() => toggleCheck('Brust')}
                  />
                  <lable className="ml-1 align-middle">Brust</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Schultern"
                    type="checkbox"
                    checked={checked.Schultern}
                    onChange={() => toggleCheck('Schultern')}
                  />
                  <lable className="ml-1 align-middle">Schultern</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Arme"
                    type="checkbox"
                    checked={checked.Arme}
                    onChange={() => toggleCheck('Arme')}
                  />
                  <lable className="ml-1 align-middle">Arme</lable>
                </div>

                <div className="col-span-2 ss:col-span-3 xl:col-span-1 place-self-start ss:place-self-center text-center">
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="alle"
                    type="checkbox"
                    checked={checkedAll}
                    onChange={(e) => selectAll(e.target.checked)}
                  />
                  <lable className="ml-1 align-middle">
                    Alle Muskelgruppen
                  </lable>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl w-full place-self-center xl:col-span-3 inline-block">
          <TabelAndSearchbox uebungen={filterUebungen(uebungen)} />
        </div>
      </div>
    </Layout>
  );
}
