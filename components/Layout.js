import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children, title = 'Übungskatalog' }) {
  return (
    <>
      <Head>
        <title>{`${title} - Übungskatalog`}</title>
        <meta
          name="viewport"
          content="width=device-width, 
        initial-scale=1.0"
        />
        <meta charSet="utf-8" />
        <meta name="description" content="Übungskatalog des Unifit" />
      </Head>
      <div
        className="overflow-y-auto antialiased bg-gray-50 text-gray-700  
      text-sm sm:text-base lg:text-lg flex flex-col h-screen"
      >
        <Header />
        <div className="flex-1 mx-5 lg:w-10/12 2xl:w-7/12 py-5 flex flex-col justify-center self-center">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
