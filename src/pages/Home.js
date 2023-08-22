import './../styles/Home.css';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={'home'}>
      <Link className={'btn'} to="/order">
        Order
      </Link>
      <Link className={'btn'} to="/recipes">
        Recipes
      </Link>
    </section>
  );
}

export default Home;
