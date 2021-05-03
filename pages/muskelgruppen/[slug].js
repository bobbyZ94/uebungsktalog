import TabelAndSearchbox from '../../components/TableAndSearchbox';
import Layout from '../../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Fetching muskelgruppen validation types to generate slug from content model via getContentType() deosn't work dynamically. Had to hardcode, sry
export async function getStaticPaths() {
  const muskelgruppenPaths = [
    'Beine',
    'Bauch',
    'Rücken',
    'Brust',
    'Schultern',
    'Arme',
  ];
  return {
    paths: muskelgruppenPaths.map((elem) => ({
      params: { slug: elem },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'uebung',
    'fields.muskelgruppe': params.slug,
  });
  return {
    props: {
      uebungen: data,
      muskelgruppe: params.slug,
    },
    revalidate: 60,
  };
}

export default function UebungenMuskelgruppen({ uebungen, muskelgruppe }) {
  if (!uebungen) return <div>404</div>;
  return (
    <Layout title={muskelgruppe}>
      <TabelAndSearchbox uebungen={uebungen} tableName={muskelgruppe} />
    </Layout>
  );
}
