import ContactUsForm from '@/components/forms/contact-us-form';

export default function ContactUs() {
  return (
    <div className="mx-auto max-w-screen-lg py-10">
      <div className="mb-8 text-center">
        <h4 className="text-3xl font-semibold text-gray-800">
          We are Here to Help!
        </h4>
        <p className="mt-2 text-lg text-gray-600">
          Have questions, feedback, or need assistance? Fill out the form below,
          and we’ll get back to you as soon as possible.
        </p>
      </div>
      <div className="mx-auto w-full">
        <ContactUsForm />
      </div>
    </div>
  );
}
