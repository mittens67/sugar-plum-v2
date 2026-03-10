"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    // Added pt-20 to clear the sticky navbar and used Creamy Vanilla background
    <div className="bg-background text-plum pt-20">
      
      {/* Hero Section with Parallax-style Banner */}
      <Section className="relative p-6">
        <div
          className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
          style={{ 
            backgroundImage: "url('/about-banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Using your Deep Plum (#4A1E4D) for the overlay instead of pure black */}
          <div className="absolute inset-0 bg-text/60 backdrop-blur-[2px] flex flex-col items-center justify-center px-6 text-center">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 animate-fade-in">
              Get in Touch
            </span>
            <SectionTitle
              className="text-5xl sm:text-7xl font-serif italic text-white drop-shadow-lg"
            >
              Contact Us
            </SectionTitle>
            <div className="w-24 h-1 bg-primary mt-6 rounded-full" />
          </div>
        </div>
      </Section>

      {/* Contact Info Grid - Glassmorphism style */}
      <Section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: "Our Bakery", detail: "123 Sugar Plum Lane, Sweetville, CA 90210" },
            { icon: Phone, title: "Phone", detail: "+1 (555) 123-4567" },
            { icon: Mail, title: "Email", detail: "hello@sugarplum.com" },
          ].map((item, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <item.icon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif italic font-bold text-plum mb-2">{item.title}</h3>
              <p className="text-plum/70 font-medium leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Map Section with Floating Effect */}
      <Section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
               <h2 className="text-3xl font-serif italic text-plum">Visit Our Sanctuary</h2>
               <p className="text-plum/50 font-medium mt-2">Follow the scent of fresh vanilla and magic.</p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase text-plum/70">Open Daily: 9am - 8pm</span>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-75" />
            <div className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                title="Sugar Plum Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220367355!2d-118.4028383!3d34.068921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c3da7306207!2s90210!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                className="grayscale-[20%] contrast-[1.1] brightness-[1.1]"
              ></iframe>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Whimsical Note */}
      <div className="text-center pb-20">
         <p className="font-serif italic text-plum/30 text-lg">{"We can't wait to share a treat with you!"}</p>
      </div>
    </div>
  );
}