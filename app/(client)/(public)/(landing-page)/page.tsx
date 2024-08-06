import Banner from './Banner';
import Hero from './Hero';
import Products from './Products';

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Hero />
      <Banner />

      <Products />

      {/* <div className="p-4">
        <ImageMagnifier
          src="https://images.unsplash.com/photo-1720048170970-3848514c3d60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
          alt="Sample Image"
          width={500}
          height={500}
          magnifierHeight={300}
          magnifierWidth={300}
          zoomLevel={2}
        />
      </div> */}
    </div>
  );
}
