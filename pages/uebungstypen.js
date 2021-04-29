/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// runs during build time; returns props which will get passed down to Muskelgruppen component
export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'uebung',
  });
  return {
    props: {
      uebungen: data.items,
    },
    revalidate: 60,
  };
}

/**
 *
 * @param {boolean} musclegroupState
 * @param {Array} uebungenFromContentful
 * @param {String} musclegroupToMatch
 * @returns jsx of generated matching uebungstyp
 */
function generateListWithMatchingUebungstyp(
  uebungstypState,
  uebungenFromContentful,
  uebungstypToMatch
) {
  return (
    <ul>
      {uebungstypState &&
        uebungenFromContentful
          .filter((uebung) => uebung.fields.uebungstyp === uebungstypToMatch)
          .map((matchedUebung) => (
            <li>
              <Link href={`/uebungen/${matchedUebung.fields.slug}`}>
                <a>
                  <div>- {matchedUebung.fields.uebungsname}</div>
                </a>
              </Link>
            </li>
          ))}
    </ul>
  );
}

export default function Uebungstypen({ uebungen }) {
  const [freihantel, setFreihantel] = useState(false);
  const [maschine, setMaschine] = useState(false);
  const [cardio, setCardio] = useState(false);

  return (
    <Layout title="Übungstypen">
      <div onClick={() => setFreihantel(!freihantel)}>Freihantel</div>
      {generateListWithMatchingUebungstyp(freihantel, uebungen, 'Freihantel')}
      <div onClick={() => setMaschine(!maschine)}>Maschine</div>
      {generateListWithMatchingUebungstyp(maschine, uebungen, 'Maschine')}
      <div onClick={() => setCardio(!cardio)}>Cardio</div>
      {generateListWithMatchingUebungstyp(cardio, uebungen, 'Cardio')}
    </Layout>
  );
}
