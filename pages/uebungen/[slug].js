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

  const uebungsDatum = new Date(uebung.fields.datum);

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

  const { muskelgruppe } = uebung.fields;
  const { uebungstyp } = uebung.fields;
  const { schwierigkeitsgrad } = uebung.fields;
  const star = '*';

  return (
    <Layout title={`${uebungsName} - Unfit Übungskatalog`}>
      <div className="flex items-center justify-center">
        <div className="md:w-8/12 text-white grid grid-cols-1 place-items-center gap-5 md:gap-10">
          <h1 className="bg-red-600 rounded-2xl shadow-2xl p-3 text-center font-semibold text-base mm:text-xl md:text-2xl xl:text-3xl">
            {uebungsName}
          </h1>
          <div className="overflow-hidden rounded-2xl bg-red-600">
            {uebungsVideo && (
              <ReactPlayer
                controls
                width="100%"
                height="100%"
                url={uebungsVideo}
              />
            )}
          </div>

          <div className="rounded-2xl shadow-2xl bg-red-600 mt-4 mb:mt-0">
            <div className="px-1">
              <div className="flex">
                <h1 className="rounded-2xl transform -translate-y-3 px-1 translate-x-1 text-center bg-red-600 font-semibold text-base mm:text-xl md:text-2xl xl:text-3xl">
                  Anleitung
                </h1>
              </div>

              <div className="transform -translate-y-2 p-1">
                {documentToReactComponents(uebung.fields.uebungsbeschreibung, {
                  renderNode: {
                    // eslint-disable-next-line react/display-name
                    [BLOCKS.EMBEDDED_ASSET]: (node) => (
                      <div className="flex justify-center my-5">
                        <Image
                          src={`https:${node.data.target.fields.file.url}`}
                          width={
                            node.data.target.fields.file.details.image.width
                          }
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
          <div className="">
            <Image
              src={`https:${bildAnfang}`}
              width={bildAnfangWidth}
              height={bildAnfangHeight}
              className="rounded-2xl"
            />
          </div>
          <div className="">
            <Image
              src={`https:${bildEnde}`}
              width={bildEndeWidth}
              height={bildEndeHeight}
              className="rounded-2xl"
            />
          </div>
          <div className="bg-red-600 overflow-hidden rounded-2xl p-3">
            <table>
              <tbody>
                <tr>
                  <td className="font-semibold border-b-2 border-r-2 border-white p-1">
                    Übungstyp
                  </td>
                  <td className="border-b-2 border-white p-1">{uebungstyp}</td>
                </tr>
                <tr>
                  <td className="pr-5 font-semibold border-b-2 border-r-2 border-white p-1">
                    Muskelgruppe
                  </td>
                  <td className="border-b-2 border-white p-1">
                    {muskelgruppe.join(', ')}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold border-r-2 border-white p-1">
                    Schwierigkeit
                  </td>
                  <td className="border-white p-1">
                    {star.repeat(schwierigkeitsgrad)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mt-5">
              Hinzugefügt am:{' '}
              {uebungsDatum.toLocaleString('de-DE', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
