import './../styles/Home.css';

import { Link } from 'react-router-dom';
function Home() {
  return (
    <section className={'home'}>
      <button className={'btn'}>
        <Link to="/order">Order</Link>
      </button>
    </section>
  );
}

export default Home;
