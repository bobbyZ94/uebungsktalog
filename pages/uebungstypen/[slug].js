import TabelAndSearchbox from '../../components/TableAndSearchbox';
import Layout from '../../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Fetching uebungstypen validation types to generate slug from content model via getContentType() deosn't work dynamically. Had to hardcode, sry
export async function getStaticPaths() {
  const uebungstypenPaths = ['Frei', 'Freihantel', 'Maschine', 'Cardio'];
  return {
    paths: uebungstypenPaths.map((elem) => ({
      params: { slug: elem },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'uebung',
    'fields.uebungstyp': params.slug,
  });
  return {
    props: {
      uebungen: data,
      uebungstyp: params.slug,
    },
    revalidate: 60,
  };
}

export default function UebungenUebungstypen({ uebungen, uebungstyp }) {
  if (!uebungen) return <div>404</div>;
  return (
    <Layout title={uebungstyp}>
      <TabelAndSearchbox uebungen={uebungen} tableName={uebungstyp} />
    </Layout>
  );
}
