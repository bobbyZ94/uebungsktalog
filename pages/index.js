/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TabelAndSearchbox from '../components/TableAndSearchbox';
import filterUebungen from '../functions/filterUebungen';
import { muskelgruppen, uebungstypen } from '../constants/constants';

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
  const chevronDown = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
  const chevronUp = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
  const [visibleUebungstypen, setVisibleUebungstypen] = useState(true);
  const [visibleMuskelgruppen, setVisibleMuskelgruppen] = useState(false);
  const [checkedAllUebungstypen, setCheckedAllUebungstypen] = useState(false);
  const [uebungstypChecked, setUebungstypChecked] = useState({
    Freihantel: true,
    Maschine: true,
    Seilzüge: true,
    Kleingeräte: true,
    Bodyweight: true,
    Cardio: true,
    Mobility: true,
  });

  const [checkedAllMuskelgruppen, setCheckedAllMuskelgruppen] = useState(false);
  const [muskelgruppeChecked, setMuskelgruppeChecked] = useState({
    Unterschenkel: true,
    Oberschenkel: true,
    Gesäß: true,
    Bauch: true,
    Unterer_Rücken: true,
    Oberer_Rücken: true,
    Brust: true,
    Schultern: true,
    Triceps: true,
    Biceps: true,
    Unterarme: true,
  });

  const toggleCheckMuskelgruppe = (inputName) => {
    setMuskelgruppeChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const toggleCheckUebungstyp = (inputName) => {
    setUebungstypChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const selectAllMuskelgruppen = (value) => {
    setCheckedAllMuskelgruppen(value);
    setMuskelgruppeChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };

  const selectAllUebungstypen = (value) => {
    setCheckedAllUebungstypen(value);
    setUebungstypChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };

  useEffect(() => {
    let allMuskelgruppenChecked = true;
    for (const inputName in muskelgruppeChecked) {
      if (muskelgruppeChecked[inputName] === false) {
        allMuskelgruppenChecked = false;
      }
    }
    if (allMuskelgruppenChecked) {
      setCheckedAllMuskelgruppen(true);
    } else {
      setCheckedAllMuskelgruppen(false);
    }

    let allUebungstypenChecked = true;
    for (const inputName in uebungstypChecked) {
      if (uebungstypChecked[inputName] === false) {
        allUebungstypenChecked = false;
      }
    }
    if (allUebungstypenChecked) {
      setCheckedAllUebungstypen(true);
    } else {
      setCheckedAllUebungstypen(false);
    }
  }, [muskelgruppeChecked, uebungstypChecked]);

  return (
    <Layout>
      <div className="grid xl:grid-cols-4 w-full h-full">
        <div className="place-self-center xl:place-self-start xl:justify-self-center xl:sticky xl:top-20 mb-5 xl:mb-0">
          <div className="shadow-2xl rounded-2xl xl:mr-5 text-white bg-red-600 flex flex-col gap-2 xl:gap-4 p-4">
            <div>
              <div
                className="cursor-pointer flex justify-between"
                onClick={() => setVisibleUebungstypen(!visibleUebungstypen)}
              >
                <h3 className="mr-2">Übungstypen</h3>
                <div className="ml-1">
                  {visibleUebungstypen ? chevronUp : chevronDown}
                </div>
              </div>
              {visibleUebungstypen && (
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-x-2">
                  {uebungstypen.map((uebungstyp) => (
                    <div key={uebungstyp}>
                      <label>
                        <input
                          className="form-checkbox text-white h-4 w-4 align-middle"
                          name={uebungstyp}
                          type="checkbox"
                          checked={uebungstypChecked[uebungstyp]}
                          onChange={() => toggleCheckUebungstyp(uebungstyp)}
                        />
                        <span className="ml-1 align-middle">{uebungstyp}</span>
                      </label>
                    </div>
                  ))}
                  <div className="col-span-2 xl:col-span-1">
                    <label>
                      <input
                        className="form-checkbox text-white h-4 w-4 align-middle"
                        name="Mobility"
                        type="checkbox"
                        checked={checkedAllUebungstypen}
                        onChange={(e) =>
                          selectAllUebungstypen(e.target.checked)
                        }
                      />
                      <span className="ml-1 align-middle">
                        Alle Übungstypen
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="cursor-pointer flex justify-between"
                onClick={() => setVisibleMuskelgruppen(!visibleMuskelgruppen)}
              >
                <h3 className="mr-2">Muskelgruppen</h3>
                <div className="ml-1">
                  {visibleMuskelgruppen ? chevronUp : chevronDown}
                </div>
              </div>
              {visibleMuskelgruppen && (
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-x-2">
                  {muskelgruppen.map((muskelgruppe) => (
                    <div key={muskelgruppe}>
                      <label>
                        <input
                          className="form-checkbox text-white h-4 w-4 align-middle"
                          name={muskelgruppe}
                          type="checkbox"
                          checked={muskelgruppeChecked[muskelgruppe]}
                          onChange={() => toggleCheckMuskelgruppe(muskelgruppe)}
                        />
                        <span className="ml-1 align-middle">
                          {muskelgruppe.replace('_', ' ')}
                        </span>
                      </label>
                    </div>
                  ))}
                  <div className="col-span-2 xl:col-span-1">
                    <label>
                      <input
                        className="form-checkbox text-white h-4 w-4 align-middle"
                        name="alle"
                        type="checkbox"
                        checked={checkedAllMuskelgruppen}
                        onChange={(e) =>
                          selectAllMuskelgruppen(e.target.checked)
                        }
                      />
                      <span className="ml-1 align-middle">
                        Alle Muskelgruppen
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl w-full place-self-start xl:col-span-3 inline-block">
          <TabelAndSearchbox
            uebungen={filterUebungen(
              uebungen,
              uebungstypChecked,
              muskelgruppeChecked,
              checkedAllUebungstypen,
              checkedAllMuskelgruppen
            )}
          />
        </div>
      </div>
    </Layout>
  );
}
