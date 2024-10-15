import Link from 'next/link';

export default function footer() {
  return (
    <footer className="m-4 ">
      <div className="mx-auto w-full max-w-screen-xl border-t border-gray-400 p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2024{' '}
          <a href="#" className="hover:underline">
            CNF Cart
          </a>
          . All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="/about" className="me-4 hover:underline md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="me-4 hover:underline md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="me-4 hover:underline md:me-6">
              Term & Condition
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
