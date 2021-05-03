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
  return (
    <Layout title={title}>
      <TabelAndSearchbox uebungen={uebungen} tableName={title} />
    </Layout>
  );
}
