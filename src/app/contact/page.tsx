"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Contact() {
  return (
    <div className="bg-pink-50 text-gray-900">
      {/* Hero Section */}
      <Section className="relative text-center p-0">
        <div
          className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden"
          style={{ backgroundImage: "url('/about-banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
            <SectionTitle
              color="pink"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            >
              Contact Us
            </SectionTitle>
            <p className="text-white max-w-2xl text-base sm:text-lg md:text-xl mt-4">
              Have a question or want to place an order? We’d love to hear from
              you!
            </p>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section className="py-16 px-4 sm:px-6">
        <SectionTitle color="pink" className="text-center">
          Visit Us
        </SectionTitle>
        <div className="mt-8 w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Sugar Plum Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192673437543!2d-122.41941508468118!3d37.77492977975915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c85b1f6ff%3A0xc8c0a1e2a6babc9b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1689987567890!5m2!1sen!2sus"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </Section>

      {/* Contact Info Section */}
      <Section className="py-16 px-4 sm:px-6">
        <SectionTitle color="pink" className="text-center">
          Get in Touch
        </SectionTitle>
        <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-xl font-semibold text-pink-500">Address</h3>
            <p className="text-gray-700">
              123 Sugar Plum Lane, Sweetville, CA 90210
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-500">Phone</h3>
            <p className="text-gray-700">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-500">Email</h3>
            <p className="text-gray-700">hello@sugarplum.com</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
