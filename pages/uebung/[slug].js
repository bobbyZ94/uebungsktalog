import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Layout from '../../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'uebung',
  });
  return {
    paths: data.items.map((item) => ({
      params: { slug: item.fields.slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'uebung',
    'fields.slug': params.slug,
  });
  return {
    props: {
      uebung: data.items[0],
    },
    revalidate: 60,
  };
}

export default function Post({ uebung }) {
  if (!uebung) return <div>404</div>;
  return (
    <Layout title={uebung.fields.uebungsname}>
      <div>
        <h1>{uebung.fields.uebungsname}</h1>
        <div>
          {documentToReactComponents(uebung.fields.uebungsbeschreibung, {
            renderNode: {
              // eslint-disable-next-line react/display-name
              [BLOCKS.EMBEDDED_ASSET]: (node) => (
                <Image
                  src={`https:${node.data.target.fields.file.url}`}
                  width={node.data.target.fields.file.details.image.width}
                  height={node.data.target.fields.file.details.image.height}
                />
              ),
            },
          })}
        </div>
      </div>
    </Layout>
  );
}
