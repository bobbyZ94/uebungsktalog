import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';
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

export default function Uebung({ uebung }) {
  const uebungsName = uebung.fields.uebungsname;
  // TODO: Enable multiple videos
  const uebungsVideo =
    uebung.fields.videos && uebung.fields.videos[0].fields.file.url;
  const isBigScreen = useMediaQuery({
    query: '(min-device-width: 640px',
  });
  if (!uebung) return <div>Diese Übung ist noch nicht eingetragen...</div>;

  return (
    <Layout title={uebungsName}>
      <h1 className="text-gray-900 text-center text-3xl font-semibold mb-5">
        {uebungsName}
      </h1>
      <div className="flex justify-center mx-5 mb-5">
        {uebungsVideo && (
          <ReactPlayer
            controls
            width={`${isBigScreen ? '600px' : '280px'}`}
            url={uebungsVideo}
          />
        )}
      </div>
      <div>
        <div className="text-gray-900 mx-5">
          {documentToReactComponents(uebung.fields.uebungsbeschreibung, {
            renderNode: {
              // eslint-disable-next-line react/display-name
              [BLOCKS.EMBEDDED_ASSET]: (node) => (
                <div className="flex justify-center my-5">
                  <Image
                    src={`https:${node.data.target.fields.file.url}`}
                    width={node.data.target.fields.file.details.image.width}
                    height={node.data.target.fields.file.details.image.height}
                  />
                </div>
              ),
            },
          })}
        </div>
      </div>
    </Layout>
  );
}
