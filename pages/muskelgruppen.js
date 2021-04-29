/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// runs during build time; returns props which will get passed down to blog component
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
 * @returns jsx of generated matching musclegroups
 */
function generateListWithMatchingMusclegroups(
  musclegroupState,
  uebungenFromContentful,
  musclegroupToMatch
) {
  return (
    <ul>
      {musclegroupState &&
        uebungenFromContentful
          .filter((uebung) =>
            uebung.fields.muskelgruppe.includes(`${musclegroupToMatch}`)
          )
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

export default function Muskelgruppen({ uebungen }) {
  const [beine, setBeine] = useState(false);
  const [bauch, setBauch] = useState(false);
  const [ruecken, setRuecken] = useState(false);
  const [brust, setBrust] = useState(false);
  const [schultern, setSchultern] = useState(false);
  const [arme, setArme] = useState(false);

  return (
    <Layout title="Muskelgruppen">
      <div onClick={() => setBeine(!beine)}>Beine</div>
      {generateListWithMatchingMusclegroups(beine, uebungen, 'Beine')}
      <div onClick={() => setBauch(!bauch)}>Bauch</div>
      {generateListWithMatchingMusclegroups(bauch, uebungen, 'Bauch')}
      <div onClick={() => setRuecken(!ruecken)}>Rücken</div>
      {generateListWithMatchingMusclegroups(ruecken, uebungen, 'Rücken')}
      <div onClick={() => setBrust(!brust)}>Brust</div>
      {generateListWithMatchingMusclegroups(brust, uebungen, 'Brust')}
      <div onClick={() => setSchultern(!schultern)}>Schultern</div>
      {generateListWithMatchingMusclegroups(schultern, uebungen, 'Schultern')}
      <div onClick={() => setArme(!arme)}>Arme</div>
      {generateListWithMatchingMusclegroups(arme, uebungen, 'Arme')}
    </Layout>
  );
}
