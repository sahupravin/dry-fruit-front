import ContainerWrapper from "../componenets/common/ContainerWrapper";
import SectionWrapper from "../componenets/common/SectionWrapper";

function InfoCard({ icon, title, children }) {
  return (
    <div className="border-brand-500 rounded-xl border bg-white p-6 text-center shadow-sm md:text-left">
      <div className="text-brand-500 mx-auto mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(159,65,3,0.1)] md:mx-0">
        {icon}
      </div>
      <h3 className="font-heading text-brand-600 mb-2 text-xl">{title}</h3>
      <div className="text-sm text-black/80">{children}</div>
    </div>
  );
}

function Contact() {
  return (
    <main>
      <SectionWrapper>
        <ContainerWrapper>
          <div className="relative mb-12 text-center">
            <h2 className="font-heading text-brand-500 mb-2 text-4xl md:text-5xl">
              Contact us
            </h2>
            <p className="text-black/70">
              Tortor at risus viverra adipiscing at in tellus integer.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Phone"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1C10.3 21 3 13.7 3 4a1 1 0 011-1h2.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.02l-2.2 2.2z" />
                </svg>
              }
            >
              <div>
                <div>
                  <strong>Toll-Free:</strong> 0000 - 123 - 456789
                </div>
                <div>
                  <strong>Fax:</strong> 0000 - 123 - 456789
                </div>
              </div>
            </InfoCard>

            <InfoCard
              title="Email"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.38 5.91a1 1 0 001.24 0L20 8.24V18H4z" />
                </svg>
              }
            >
              <div>
                <div>mail@example.com</div>
                <div>support@example.com</div>
              </div>
            </InfoCard>

            <InfoCard
              title="Address"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              }
            >
              <div>
                No: 58 A, East Madison Street,
                <br /> Baltimore, MD, USA 4508
              </div>
            </InfoCard>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Google Map */}
            <div className="bg-white">
              <div className="aspect-[4/3.4] w-full overflow-hidden">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0392810139265!2d79.13430132980687!3d21.150834993115154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c712f6e84e11%3A0x5f154e6a5ad1c70a!2sWardhaman%20Nagar%20Colony%2C%20Nagpur%2C%20Maharashtra%20440008!5e0!3m2!1sen!2sin!4v1758200153664!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <form className="bg-white">
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="border-brand-200 rounded-full border px-5 py-3 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border-brand-200 rounded-full border px-5 py-3 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="border-brand-200 rounded-full border px-5 py-3 outline-none"
                />
                <textarea
                  rows="7"
                  placeholder="Message"
                  className="border-brand-200 rounded-3xl border px-5 py-3 outline-none"
                />
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="text-brand-500 hover:bg-brand-50 hover:text-brand-600 border-brand-200 rounded-full border px-8 py-3 transition duration-300 ease-in-out"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </main>
  );
}

export default Contact;
