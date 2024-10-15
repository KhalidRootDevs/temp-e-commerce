import ContactUsForm from '@/components/forms/contact-us-form';

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center space-y-5">
          <h2 className="text-3xl font-semibold">Get in Touch with Us</h2>
          <p className="text-lg text-gray-700">
            Have a question or need assistance? We are here to help! Reach out
            to us using the form, and our team will get back to you as soon as
            possible.
          </p>

          <p className="text-lg text-gray-700">
            We look forward to hearing from you!
          </p>
        </div>
        <ContactUsForm />
      </div>
    </div>
  );
}
