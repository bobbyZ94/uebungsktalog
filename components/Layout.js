import Head from 'next/head';
import Image from 'next/image';
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
      <div className="fixed w-full h-full">
        <Image
          className="z-10 opacity-70"
          src="/unifit-sw.jpg"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div
        className="
      text-sm sm:text-base lg:text-lg flex flex-col h-screen"
      >
        <div className="z-20">
          <Header />
        </div>

        <div className="z-20 mx-5 py-5 flex-1">{children}</div>
        <div className="z-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
