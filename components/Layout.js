import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Übungskatalog Unifit</title>
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
        <div className="text-gray-50 flex-1 mx-5 py-5 grid grid-cols-3 items-center">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
