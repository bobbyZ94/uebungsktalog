import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children, title = 'Übungskatalog Unifit' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, 
        initial-scale=1.0"
        />
        <meta charSet="utf-8" />
        <meta name="description" content="Übungskatalog des Unifit" />
      </Head>
      <div
        className="overflow-y-auto antialiased bg-white
      text-sm sm:text-base lg:text-lg flex flex-col h-screen"
      >
        <Header />
        <div className="mx-5 py-5 flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
