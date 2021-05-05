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
  const title = 'Alle Übungen';
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
    <Layout title={title}>
      <div className="text-gray-900 flex flex-row items-center justify-center gap-5 mb-5">
        <div>
          Übungstypen
          <div>
            <select
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
          <div>
            <input
              name="alle"
              type="checkbox"
              checked={checkedAll}
              onChange={(e) => selectAll(e.target.checked)}
            />
            <lable className="ml-1">Alle Muskelgruppen</lable>
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
