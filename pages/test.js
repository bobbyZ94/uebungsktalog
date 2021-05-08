/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Layout from '../components/Layout';

export default function Test() {
  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-evenly">
          <div className="bg-red-400">1</div>
          <div className="bg-blue-400">2</div>
          <div className="bg-pink-400">3</div>
          <div className="bg-gray-400">4</div>
          <div className="bg-green-400">5</div>
          <div className="bg-yellow-400">6</div>
        </div>
      </div>
    </Layout>
  );
}
