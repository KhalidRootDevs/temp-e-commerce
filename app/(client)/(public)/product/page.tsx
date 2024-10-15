import AllProducts from './_components/AllProducts';

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
  return (
    <div className="mx-auto max-w-screen-xl">
      <AllProducts searchParams={searchParams} />
    </div>
  );
}
