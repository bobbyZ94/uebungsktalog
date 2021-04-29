/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import Layout from '../components/Layout';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// runs during build time; returns props which will get passed down to Muskelgruppen component
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

function generateAlphabeticallySortedArrayOfUebungen(uebungen) {
  return uebungen
    .sort(function (a, b) {
      const textA = a.fields.uebungsname.toUpperCase();
      const textB = b.fields.uebungsname.toUpperCase();
      return textA.localeCompare(textB);
    })
    .map((uebung) => (
      <div className="text-gray-900">
        <Link href={`/uebungen/${uebung.fields.slug}`}>
          <a>
            <div>- {uebung.fields.uebungsname}</div>
          </a>
        </Link>
      </div>
    ));
}

export default function Uebungstypen({ uebungen }) {
  return (
    <Layout title="Übungstypen">
      <div className="self-center grid grid-rows-1 gap-2">
        {generateAlphabeticallySortedArrayOfUebungen(uebungen)}
      </div>
    </Layout>
  );
}
