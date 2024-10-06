import Banner from './Banner';
import Hero from './Hero';
import Products from './Products';

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Hero />
      <Banner />
      <Products />
    </div>
  );
}
