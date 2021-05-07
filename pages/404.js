import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout title="404">
      <div className="w-full h-full text-xl text-center flex items-center justify-center">
        <div>Diese Seite existiert nicht ... 404!</div>
      </div>
    </Layout>
  );
}
