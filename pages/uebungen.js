import Link from 'next/link';
import Layout from '../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// runs during build time; returns props which will get passed down to blog component
export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'uebung',
  });
  return {
    props: {
      uebungen: data.items,
    },
    revalidate: 60,
  };
}

export default function Uebungen({ uebungen }) {
  const noEntries = (
    <div
      className="text-center w-full p-5 rounded-2xl bg-gray-200
    dark:bg-gray-800 shadow-lg"
    >
      Keine Eintragungen im Übungskatalog ...
    </div>
  );
  return (
    <Layout title="Übungen">
      <div className="self-center grid grid-rows-1 gap-5">
        {uebungen.length !== 0
          ? uebungen.map((uebung) => (
              <div
                className="w-full rounded-2xl p-2 bg-gray-200
          dark:bg-gray-800 shadow-lg"
                key={uebung.sys.id}
              >
                <Link href={`/uebungen/${uebung.fields.slug}`}>
                  <a>
                    <div className="m-1 flex flex-row justify-between">
                      <div className="underline font-bold">
                        {uebung.fields.uebungsname}
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))
          : noEntries}
      </div>
    </Layout>
  );
}
