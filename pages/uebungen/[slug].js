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

  const bildAnfang =
    uebung.fields.bildAnfang && uebung.fields.bildAnfang.fields.file.url;
  const bildAnfangWidth =
    uebung.fields.bildAnfang &&
    uebung.fields.bildAnfang.fields.file.details.image.width;
  const bildAnfangHeight =
    uebung.fields.bildAnfang &&
    uebung.fields.bildAnfang.fields.file.details.image.height;

  const bildEnde =
    uebung.fields.bildEnde && uebung.fields.bildEnde.fields.file.url;
  const bildEndeWidth =
    uebung.fields.bildEnde &&
    uebung.fields.bildEnde.fields.file.details.image.width;
  const bildEndeHeight =
    uebung.fields.bildEnde &&
    uebung.fields.bildEnde.fields.file.details.image.height;

  const { muskelgruppe } = uebung.fields;
  const { uebungstyp } = uebung.fields;
  const { schwierigkeitsgrad } = uebung.fields;
  const star = '*';
  return (
    <Layout title={`${uebungsName} - Unfit Übungskatalog`}>
      <div className="flex items-center justify-center">
        <div className="gap-5 flex flex-col justify-center place-items-center ss:w-10/12 mm:w-8/12 xl:w-6/12 text-white">
          <div className="bg-red-600  rounded-2xl p-3 flex-col text-center">
            <div>Typ: {uebungstyp}</div>
            <h1 className="mt-2">
              <span className="uppercase">{uebungsName}</span>
            </h1>
          </div>

          {uebungsVideo && (
            <div className="flex flex-col">
              <div className="flex justify-end">
                <h3 className="transform -translate-x-5 translate-y-1 rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                  Übungsvideo
                </h3>
              </div>

              <div className="bg-red-600 p-3 rounded-2xl max-w-lg">
                <div className="overflow-hidden rounded-2xl">
                  <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={uebungsVideo}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col max-w-3xl">
            <div className="flex justify-start">
              <h3 className="transform translate-x-5 translate-y-1 rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                Anleitung
              </h3>
            </div>

            <div className="p-3 rounded-2xl bg-red-600">
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
          {bildAnfang && (
            <div className="flex flex-col">
              <div className="flex justify-start transform translate-x-5 translate-y-1">
                <h3 className="rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                  Übungsanfang
                </h3>
              </div>
              <div className="bg-red-600 p-3 rounded-2xl max-w-lg flex">
                <Image
                  src={`https:${bildAnfang}`}
                  width={bildAnfangWidth}
                  height={bildAnfangHeight}
                  className="rounded-2xl"
                />
              </div>
            </div>
          )}
          {bildEnde && (
            <div className="flex flex-col">
              <div className="flex justify-end transform -translate-x-5 translate-y-1">
                <h3 className="rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                  Übungsende
                </h3>
              </div>
              <div className="bg-red-600 p-3 rounded-2xl max-w-lg flex">
                <Image
                  src={`https:${bildEnde}`}
                  width={bildEndeWidth}
                  height={bildEndeHeight}
                  className="rounded-2xl"
                />
              </div>
            </div>
          )}

          <div className="p-3 bg-red-600 overflow-hidden rounded-2xl text-white max-w-md">
            <table>
              <tbody>
                <tr>
                  <td className="pr-5 font-semibold border-b-2 border-r-2 border-white p-1">
                    Muskelgruppe
                  </td>
                  <td className="text-center border-b-2 border-white p-1">
                    {muskelgruppe.join(', ')}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold border-b-2 border-r-2 border-white p-1">
                    Schwierigkeit
                  </td>
                  <td className="text-center border-b-2 border-white p-1">
                    {star.repeat(schwierigkeitsgrad)}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold border-r-2 border-white p-1">
                    Hinzugefügt
                  </td>
                  <td className="text-center border-white p-1">
                    {uebungsDatum.toLocaleString('de-DE', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
