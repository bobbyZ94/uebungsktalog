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
        <div className="place-items-center grid grid-cols-1 md:grid-cols-2 p-5 bg-red-600 rounded-2xl ss:w-10/12 mm:w-8/12 xl:w-6/12 text-white gap-5">
          <h1 className="md:col-span-2 bg-red-600 rounded-2xl underline text-center">
            {uebungsName}
          </h1>

          <div className="grid grid-cols-1 md:col-span-2 border-2 border-white">
            <div className="">
              <div className="flex">
                <h3 className="px-1 rounded-2xl transform -translate-y-3 sm:-translate-y-4 translate-x-1 text-center bg-red-600">
                  Anleitung
                </h3>
              </div>
              <div className="max-w-md float-right p-2">
                <div className="overflow-hidden rounded-2xl">
                  {uebungsVideo && (
                    <ReactPlayer
                      controls
                      width="100%"
                      height="100%"
                      url={uebungsVideo}
                    />
                  )}
                </div>
              </div>
              <div className="px-2">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2 mt-3 place-items-center">
              <div className="max-w-md">
                <h3 className="font-semibold">Übungsanfang</h3>
                <Image
                  src={`https:${bildAnfang}`}
                  width={bildAnfangWidth}
                  height={bildAnfangHeight}
                  className="rounded-2xl"
                />
              </div>
              <div className="max-w-md">
                <h3 className="font-semibold">Übungsende</h3>
                <Image
                  src={`https:${bildEnde}`}
                  width={bildEndeWidth}
                  height={bildEndeHeight}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-red-600 overflow-hidden rounded-2xl p-3">
            <table>
              <tbody>
                <tr>
                  <td className="font-semibold border-b-2 border-r-2 border-white p-1">
                    Übungstyp
                  </td>
                  <td className="text-center border-b-2 border-white p-1">
                    {uebungstyp}
                  </td>
                </tr>
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
