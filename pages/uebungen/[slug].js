import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
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
  console.log(uebung);
  const uebungsName = uebung.fields.uebungsname;
  const isBigScreen = useMediaQuery({
    query: '(min-device-width: 640px',
  });
  if (!uebung) return <div>404</div>;
  return (
    <Layout title={uebungsName}>
      <h1 className="text-center text-3xl font-semibold mb-5">
        {uebungsName} mit{' '}
        <Link href="https://www.instagram.com/lara_frosting/?hl=de">
          <div className="text-pink-400 transform hover:-translate-y-7">
            📷Lara_frosting
          </div>
        </Link>
      </h1>
      <div className="flex justify-center mx-5">
        <ReactPlayer
          controls
          width={`${isBigScreen ? '600px' : '280px'}`}
          url="//videos.ctfassets.net/if39ybjh7hnz/6NhMNGM8oaoaqRp32hPL5f/ef5530b668dfa9234a4268363a611b87/Definierte_Arme_Uebung_1_Bicepscurlsgegenwand-SMALL.m4v"
        />
      </div>
      <div>
        <div className="mx-5">
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
