import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import ReactPlayer from 'react-player';
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
  if (!uebung)
    return (
      <Layout>
        <div className="w-full h-full text-xl text-center flex items-center justify-center">
          <div>Diese Übung ist noch nicht eingetragen ... 404!</div>
        </div>
      </Layout>
    );

  const uebungsName = uebung.fields.uebungsname;

  const uebungsVideo =
    uebung.fields.videos && uebung.fields.videos[0].fields.file.url;

  const bildAnfang = uebung.fields.bildAnfang.fields.file.url;
  const bildAnfangWidth =
    uebung.fields.bildAnfang.fields.file.details.image.width;
  const bildAnfangHeight =
    uebung.fields.bildAnfang.fields.file.details.image.height;

  const bildEnde = uebung.fields.bildEnde.fields.file.url;
  const bildEndeWidth = uebung.fields.bildEnde.fields.file.details.image.width;
  const bildEndeHeight =
    uebung.fields.bildEnde.fields.file.details.image.height;

  return (
    <Layout title={`${uebungsName} - Unfit Übungskatalog`}>
      <div className="text-gray-50 bg-red-600 rounded-2xl grid place-items-center">
        <h1 className="underline p-3 text-center font-semibold text-base mm:text-xl md:text-2xl xl:text-3xl">
          {uebungsName}
        </h1>
        <div className="mx-5 mb-5">
          {uebungsVideo && (
            <ReactPlayer
              controls
              width="100%"
              height="100%"
              url={uebungsVideo}
            />
          )}
        </div>
        <div className="mx-5 mb-5">
          <Image
            src={`https:${bildAnfang}`}
            width={bildAnfangWidth}
            height={bildAnfangHeight}
          />
        </div>
        <div className="mx-5 mb-5">
          <Image
            src={`https:${bildEnde}`}
            width={bildEndeWidth}
            height={bildEndeHeight}
          />
        </div>
        <div>
          <div className="mx-5 mb-5 border-2 border-gray-50 px-1">
            <h1 className="transform -translate-y-3 ml-1 translate-x-1 text-center bg-red-600 w-16">
              Anleitung
            </h1>
            <div className="transform -translate-y-2">
              {documentToReactComponents(uebung.fields.uebungsbeschreibung, {
                renderNode: {
                  // eslint-disable-next-line react/display-name
                  [BLOCKS.EMBEDDED_ASSET]: (node) => (
                    <div className="flex justify-center my-5">
                      <Image
                        src={`https:${node.data.target.fields.file.url}`}
                        width={node.data.target.fields.file.details.image.width}
                        height={
                          node.data.target.fields.file.details.image.height
                        }
                      />
                    </div>
                  ),
                },
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
