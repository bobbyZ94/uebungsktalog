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
  const [uebungstyp, setUebungstyp] = useState({
    Frei: true,
    Freihantel: true,
    Cardio: true,
    Maschine: true,
  });

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

  const toggleCheckUebungstyp = (inputName) => {
    setUebungstyp((prevState) => {
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
    if (
      checkedAll &&
      uebungstyp.Frei &&
      uebungstyp.Cardio &&
      uebungstyp.Freihantel &&
      uebungstyp.Maschine
    ) {
      return uebungen.items;
    }

    let result = [];

    if (uebungstyp.Frei) {
      const filter = uebungen.items.filter(
        (uebungen) => uebungen.fields.uebungstyp === 'Frei'
      );
      result = [...result, ...filter];
    }
    if (uebungstyp.Freihantel) {
      const filter = uebungen.items.filter(
        (uebungen) => uebungen.fields.uebungstyp === 'Freihantel'
      );
      result = [...result, ...filter];
    }
    if (uebungstyp.Maschine) {
      const filter = uebungen.items.filter(
        (uebungen) => uebungen.fields.uebungstyp === 'Maschine'
      );
      result = [...result, ...filter];
    }
    if (uebungstyp.Cardio) {
      const filter = uebungen.items.filter(
        (uebungen) => uebungen.fields.uebungstyp === 'Cardio'
      );
      result = [...result, ...filter];
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
        <div className="place-self-center xl:place-self-start xl:justify-self-center xl:sticky xl:top-72 mb-5 xl:mb-0">
          <div className="shadow-2xl rounded-2xl xl:mr-5 text-white bg-red-600 flex flex-col gap-5 p-4">
            <div>
              <h3 className="inline mr-2">Übungstyp:</h3>
              <div className="grid grid-cols-2 ss:grid-cols-2 xl:grid-cols-1 gap-x-2">
                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Frei"
                    type="checkbox"
                    checked={uebungstyp.Frei}
                    onChange={() => toggleCheckUebungstyp('Frei')}
                  />
                  <lable className="ml-1 align-middle">Frei</lable>
                </div>
                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Freihantel"
                    type="checkbox"
                    checked={uebungstyp.Freihantel}
                    onChange={() => toggleCheckUebungstyp('Freihantel')}
                  />
                  <lable className="ml-1 align-middle">Freihantel</lable>
                </div>
                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Maschine"
                    type="checkbox"
                    checked={uebungstyp.Maschine}
                    onChange={() => toggleCheckUebungstyp('Maschine')}
                  />
                  <lable className="ml-1 align-middle">Maschine</lable>
                </div>
                <div>
                  <input
                    className="form-checkbox text-white h-4 w-4 align-middle"
                    name="Cardio"
                    type="checkbox"
                    checked={uebungstyp.Cardio}
                    onChange={() => toggleCheckUebungstyp('Cardio')}
                  />
                  <lable className="ml-1 align-middle">Cardio</lable>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mr-2">Muskelgruppe:</h3>
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

                <div className="col-span-2 ss:col-span-3 xl:col-span-1">
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

        <div className="rounded-2xl overflow-hidden shadow-2xl w-full place-self-start xl:col-span-3 inline-block">
          <TabelAndSearchbox uebungen={filterUebungen(uebungen)} />
        </div>
      </div>
    </Layout>
  );
}
