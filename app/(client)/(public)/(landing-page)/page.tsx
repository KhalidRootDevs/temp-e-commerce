import ImageMagnifier from '@/components/image-magnifier';
import Banner from './Banner';
import Hero from './Hero';
import Products from './Products';

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Hero />
      <Banner />

      <Products />

      <div className="p-4">
        <ImageMagnifier
          src="https://media.istockphoto.com/id/497000834/photo/little-asian-boy.jpg?s=2048x2048&w=is&k=20&c=PCdEGumNjX-vWC6E1XZn-kap6JGILImjN46h7GWYTTE="
          alt="Sample Image"
          width={500}
          height={500}
          magnifierHeight={300}
          magnifierWidth={300}
          zoomLevel={2}
        />
      </div>
    </div>
  );
}
