/* eslint-disable no-shadow */
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
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1280px)' });
  if (!uebung)
    return (
      <Layout>
        <div className="w-full h-full text-xl text-center flex items-center justify-center">
          <div>Diese Übung ist noch nicht eingetragen ... 404!</div>
        </div>
      </Layout>
    );

  const uebungsName = uebung.fields.uebungsname;

  // const uebungsDatum = new Date(uebung.fields.datum);

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

  const { uebungsbeschreibung } = uebung.fields;
  const { uebungshinweise } = uebung.fields;
  const { uebungsfehler } = uebung.fields;
  const { uebungsvariationen } = uebung.fields;

  const { muskelgruppe } = uebung.fields;
  const { uebungstyp } = uebung.fields;
  const { schwierigkeitsgrad } = uebung.fields;
  const star = '*';
  const options = {
    renderNode: {
      [BLOCKS.LIST_ITEM]: (node) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => children,
          },
        });

        return <>{UnTaggedChildren}</>;
      },
    },
  };
  return (
    <Layout title={`${uebungsName} - Unfit Übungskatalog`}>
      <div className="flex items-center justify-center">
        <div className="gap-5 flex flex-col justify-center place-items-center ss:w-10/12 xl:w-8/12 text-white">
          <div className="bg-red-600  rounded-2xl p-3 flex-col text-center">
            <div>Typ: {uebungstyp}</div>
            <h1 className="mt-2">
              <span className="uppercase">{uebungsName}</span>
            </h1>
          </div>

          {/* BILDER */}
          {!isBigScreen && bildAnfang && (
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
          {!isBigScreen && bildEnde && (
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
          {isBigScreen && bildAnfang && bildEnde && (
            <div className="flex gap-5">
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
            </div>
          )}

          {/* BESCHREIBUNG */}
          {uebungsbeschreibung && (
            <div className="flex flex-col max-w-3xl">
              <div className="flex justify-start">
                <h3 className="transform translate-x-5 translate-y-1 rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                  Beschreibung ✔
                </h3>
              </div>
              <div className="list-decimal p-3 rounded-2xl bg-red-600">
                <article className="prose prose-sm sm:prose lg:prose-lg">
                  {documentToReactComponents(
                    uebung.fields.uebungsbeschreibung,
                    options
                  )}
                </article>
              </div>
            </div>
          )}

          {/* HINWEISE */}
          {uebungshinweise && (
            <div className="flex flex-col max-w-3xl">
              <div className="flex justify-end">
                <h3 className="transform -translate-x-5 translate-y-1 rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                  Hinweise !
                </h3>
              </div>
              <div className="list-decimal p-3 rounded-2xl bg-red-600">
                <article className="prose prose-sm sm:prose lg:prose-lg">
                  {documentToReactComponents(
                    uebung.fields.uebungshinweise,
                    options
                  )}
                </article>
              </div>
            </div>
          )}

          {/* FEHLER */}
          {uebungsfehler && (
            <div className="flex flex-col max-w-3xl">
              <div className="flex justify-start">
                <h3 className="transform translate-x-5 translate-y-1 rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                  Häufige Fehler X
                </h3>
              </div>
              <div className="list-decimal p-3 rounded-2xl bg-red-600">
                <article className="prose prose-sm sm:prose lg:prose-lg">
                  {documentToReactComponents(
                    uebung.fields.uebungsfehler,
                    options
                  )}
                </article>
              </div>
            </div>
          )}

          {/* VARIATIONEN */}
          {uebungsvariationen && (
            <div className="flex flex-col max-w-3xl">
              <div className="flex justify-end">
                <h3 className="transform -translate-x-5 translate-y-1 rounded-t-2xl pt-3 px-3 text-center bg-red-600">
                  Variationen ~
                </h3>
              </div>
              <div className="list-decimal p-3 rounded-2xl bg-red-600">
                <article className="prose prose-sm sm:prose lg:prose-lg">
                  {documentToReactComponents(
                    uebung.fields.uebungsvariationen,
                    options
                  )}
                </article>
              </div>
            </div>
          )}

          {/* ÜBUNGSVIDEO */}
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

          {/* INFOBOX */}
          <div className="p-3 bg-red-600 overflow-hidden rounded-2xl text-white max-w-md">
            <table>
              <tbody>
                <tr>
                  <td className="text-center px-2 font-semibold border-b-2 border-r-2 border-white p-1">
                    Muskelgruppe
                  </td>
                  <td className="text-center px-2 border-b-2 border-white p-1">
                    {muskelgruppe.join(', ')}
                  </td>
                </tr>
                <tr>
                  <td className="text-center font-semibold border-b-2 border-r-2 border-white p-1">
                    Schwierigkeit
                  </td>
                  <td className="text-center border-b-2 border-white p-1">
                    {star.repeat(schwierigkeitsgrad)}
                  </td>
                </tr>
                {/* <tr>
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
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
