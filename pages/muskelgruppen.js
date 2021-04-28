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
 * @param {String} muskelgruppe
 * @param {Array} uebungMuskelgruppen
 * @returns
 */
function checkMuskelgruppen(muskelgruppe, uebungMuskelgruppen) {
  return uebungMuskelgruppen.includes(muskelgruppe);
}

export default function Muskelgruppen({ uebungen }) {
  const [beine, setBeine] = useState(false);
  const [bauch, setBauch] = useState(false);
  const [ruecken, setRuecken] = useState(false);
  const [brust, setBrust] = useState(false);
  const [schultern, setSchultern] = useState(false);
  const [arme, setArme] = useState(false);

  console.log(uebungen[0].fields.muskelgruppe.includes('Beine'));

  const noEntries = (
    <div
      className="text-center w-full p-5 rounded-2xl bg-gray-200
    dark:bg-gray-800 shadow-lg"
    >
      Keine Eintragungen im Übungskatalog ...
    </div>
  );
  return (
    <Layout title="Muskelgruppen">
      <div onClick={() => setBeine(!beine)}>Beine</div>
      <ul>
        {console.log(uebungen)}
        {beine &&
          uebungen
            .filter((uebung) => uebung.fields.muskelgruppe.includes('Beine'))
            .map((uebungInGruppe) => (
              <li>
                <Link href={`/uebungen/${uebungInGruppe.fields.slug}`}>
                  <a>
                    <div>- {uebungInGruppe.fields.uebungsname}</div>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
      <div onClick={() => setBauch(!bauch)}>Bauch</div>
      <ul>
        {console.log(uebungen)}
        {bauch &&
          uebungen
            .filter((uebung) => uebung.fields.muskelgruppe.includes('Bauch'))
            .map((uebungInGruppe) => (
              <li>
                <Link href={`/uebungen/${uebungInGruppe.fields.slug}`}>
                  <a>
                    <div>- {uebungInGruppe.fields.uebungsname}</div>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
      <div onClick={() => setRuecken(!ruecken)}>Rücken</div>
      <ul>
        {console.log(uebungen)}
        {ruecken &&
          uebungen
            .filter((uebung) => uebung.fields.muskelgruppe.includes('Rücken'))
            .map((uebungInGruppe) => (
              <li>
                <Link href={`/uebungen/${uebungInGruppe.fields.slug}`}>
                  <a>
                    <div>- {uebungInGruppe.fields.uebungsname}</div>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
      <div onClick={() => setBrust(!brust)}>Brust</div>
      <ul>
        {console.log(uebungen)}
        {brust &&
          uebungen
            .filter((uebung) => uebung.fields.muskelgruppe.includes('Brust'))
            .map((uebungInGruppe) => (
              <li>
                <Link href={`/uebungen/${uebungInGruppe.fields.slug}`}>
                  <a>
                    <div>- {uebungInGruppe.fields.uebungsname}</div>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
      <div onClick={() => setSchultern(!schultern)}>Schultern</div>
      <ul>
        {console.log(uebungen)}
        {schultern &&
          uebungen
            .filter((uebung) =>
              uebung.fields.muskelgruppe.includes('Schultern')
            )
            .map((uebungInGruppe) => (
              <li>
                <Link href={`/uebungen/${uebungInGruppe.fields.slug}`}>
                  <a>
                    <div>- {uebungInGruppe.fields.uebungsname}</div>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
      <div onClick={() => setArme(!arme)}>Arme</div>
      <ul>
        {console.log(uebungen)}
        {arme &&
          uebungen
            .filter((uebung) => uebung.fields.muskelgruppe.includes('Arme'))
            .map((uebungInGruppe) => (
              <li>
                <Link href={`/uebungen/${uebungInGruppe.fields.slug}`}>
                  <a>
                    <div>- {uebungInGruppe.fields.uebungsname}</div>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
    </Layout>
  );
}
