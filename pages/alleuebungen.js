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

export default function AlleUebungen({ uebungen }) {
  const title = 'Alle Übungen';

  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({
    Frei: false,
    Freihantel: false,
    Maschine: false,
    Cardio: false,
    Beine: false,
    Bauch: false,
    Ruecken: false,
    Brust: false,
    Schultern: false,
    Arme: false,
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
    if (checkedAll) {
      return uebungen.items;
    }
    return uebungen.items;
  }

  console.log(uebungen);

  return (
    <Layout title={title}>
      <div className="text-gray-900 flex flex-row items-center justify-center gap-5 mb-5">
        <div>
          Übungstypen
          <div>
            <input
              name="Frei"
              type="checkbox"
              checked={checked.Frei}
              onChange={() => toggleCheck('Frei')}
            />
            <lable className="ml-1">Frei</lable>
          </div>
          <div>
            <input
              name="Freihantel"
              type="checkbox"
              checked={checked.Freihantel}
              onChange={() => toggleCheck('Freihantel')}
            />
            <lable className="ml-1">Freihantel</lable>
          </div>
          <div>
            <input
              name="Maschine"
              type="checkbox"
              checked={checked.Maschine}
              onChange={() => toggleCheck('Maschine')}
            />
            <lable className="ml-1">Maschine</lable>
          </div>
          <div>
            <input
              name="Cardio"
              type="checkbox"
              checked={checked.Cardio}
              onChange={() => toggleCheck('Cardio')}
            />
            <lable className="ml-1">Cardio</lable>
          </div>
        </div>
        <div>
          Muskelgruppen
          <div>
            <input
              name="Beine"
              type="checkbox"
              checked={checked.Beine}
              onChange={() => toggleCheck('Beine')}
            />
            <lable className="ml-1">Beine</lable>
          </div>
          <div>
            <input
              name="Bauch"
              type="checkbox"
              checked={checked.Bauch}
              onChange={() => toggleCheck('Bauch')}
            />
            <lable className="ml-1">Bauch</lable>
          </div>
          <div>
            <input
              name="Ruecken"
              type="checkbox"
              checked={checked.Ruecken}
              onChange={() => toggleCheck('Ruecken')}
            />
            <lable className="ml-1">Ruecken</lable>
          </div>
          <div>
            <input
              name="Brust"
              type="checkbox"
              checked={checked.Brust}
              onChange={() => toggleCheck('Brust')}
            />
            <lable className="ml-1">Brust</lable>
          </div>
          <div>
            <input
              name="Schultern"
              type="checkbox"
              checked={checked.Schultern}
              onChange={() => toggleCheck('Schultern')}
            />
            <lable className="ml-1">Schultern</lable>
          </div>
          <div>
            <input
              name="Arme"
              type="checkbox"
              checked={checked.Arme}
              onChange={() => toggleCheck('Arme')}
            />
            <lable className="ml-1">Arme</lable>
          </div>
        </div>
        <div>
          <div>
            <input
              name="alle"
              type="checkbox"
              checked={checkedAll}
              onChange={(e) => selectAll(e.target.checked)}
            />
            <lable className="ml-1">Alle Übungen</lable>
          </div>
        </div>
      </div>
      <TabelAndSearchbox
        uebungen={filterUebungen(uebungen)}
        tableName={title}
      />
    </Layout>
  );
}
