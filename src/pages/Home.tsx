import './../styles/Home.css';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={'home'}>
      <Link className={'btn btnHome'} to="/order">
        Order
      </Link>
      <Link className={'btn btnHome'} to="/recipes">
        Recipes
      </Link>
      <Link className={'btn btnHome'} to="/addrecipes">
        Add Recipes
      </Link>
    </section>
  );
}

export default Home;
