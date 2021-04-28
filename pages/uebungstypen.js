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

export default function Uebungstypen({ uebungen }) {
  const noEntries = (
    <div
      className="text-center w-full p-5 rounded-2xl bg-gray-200
    dark:bg-gray-800 shadow-lg"
    >
      Keine Eintragungen im Übungskatalog ...
    </div>
  );
  return (
    <Layout title="Übungstypen">
      <div>Beine</div>
      <div>Bauch</div>
      <div>Rücken</div>
      <div>Brust</div>
      <div>Schultern</div>
      <div>Arme</div>
    </Layout>
  );
}
