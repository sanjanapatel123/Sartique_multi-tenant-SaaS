"use client";

const ContactForm = () => {
  return (
    <section className="bg-[var(--background)] pb-16 md:pb-20">
      <div className="container">
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm md:p-10 lg:p-14">
          {/* Heading */}

          <div className="max-w-2xl">
            <h2 className="font-playfair text-3xl text-[var(--heading)] md:text-4xl">
              Get in Touch
            </h2>

            <p className="mt-4 text-[16px] leading-7 text-[var(--text)]">
              Fill out the form below and our team will get back to you shortly.
            </p>

            <p className="text-[16px] leading-7 text-[var(--text-light)]">
              We usually respond within 1–2 business days.
            </p>
          </div>

          {/* Form */}

          <form className="mt-12">
            {/* Row 1 */}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-[15px] font-medium text-[var(--heading)]">
                  First Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Your first name"
                  className="h-14 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 outline-none transition focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="mb-3 block text-[15px] font-medium text-[var(--heading)]">
                  Last Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Your last name"
                  className="h-14 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 outline-none transition focus:border-[var(--primary)]"
                />
              </div>
            </div>

            {/* Row 2 */}

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-[15px] font-medium text-[var(--heading)]">
                  Phone Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="h-14 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 outline-none transition focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="mb-3 block text-[15px] font-medium text-[var(--heading)]">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  placeholder="you@company.com"
                  className="h-14 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 outline-none transition focus:border-[var(--primary)]"
                />
              </div>
            </div>

            {/* Reason */}

            <div className="mt-8">
              <label className="mb-3 block text-[15px] font-medium text-[var(--heading)]">
                Reason for Contact <span className="text-red-500">*</span>
              </label>

              <select className="h-14 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 outline-none transition focus:border-[var(--primary)]">
                <option>Select a reason</option>
                <option>Book a Demo</option>
                <option>Sales Inquiry</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>General Question</option>
              </select>
            </div>

            {/* Message */}

            <div className="mt-8">
              <label className="mb-3 block text-[15px] font-medium text-[var(--heading)]">
                Message <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={7}
                placeholder="Tell us a bit more about your request"
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 outline-none transition focus:border-[var(--primary)]"
              />
            </div>

            {/* Button */}

            <button
              type="submit"
              className="mt-10 rounded-full bg-[var(--primary)] px-10 py-4 text-[16px] font-semibold text-white transition hover:bg-[var(--primary-light)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
