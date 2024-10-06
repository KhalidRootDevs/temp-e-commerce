import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import CheckoutPage from '../../_components/CheckoutPage';

export default function page() {
  const cookieStore = cookies();

  const userTokenObj = cookieStore
    .getAll()
    .find((item) => item.name === 'token');
  const planTokenObj = cookieStore
    .getAll()
    .find((item) => item.name === 'prodToken');

  let decodedUser = null;
  let decodedPlan = null;
  if (userTokenObj && planTokenObj) {
    decodedUser = jwt.verify(
      userTokenObj.value,
      process.env.NEXT_PUBLIC_ENCRYPTION_KEY || ''
    );
    decodedPlan = jwt.verify(
      planTokenObj.value,
      process.env.NEXT_PUBLIC_ENCRYPTION_KEY || ''
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <CheckoutPage />
    </div>
  );
}
