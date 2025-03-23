import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { default as BaseLink } from "next/link";
import ContactForm from "./contactForm";

export default function ContactSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light-primary" id="contact">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-gray md:text-lg mb-6 md:mb-8">
            Have questions about our programs? Reach out to us and our team will
            get back to you shortly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p>
                    4<sup>th</sup> Floor, Yakub Ali Mobile Market, Mawna
                    Chourasta, Sreepur, Gazipur.
                  </p>
                </div>
                <BaseLink
                  href="tel:+8801715363919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <p>01715363919</p>
                </BaseLink>
                <BaseLink
                  href="mailto:support@dcta.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <p>support@dcta.com</p>
                </BaseLink>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Follow Us</h3>
              <div className="flex gap-2">
                <BaseLink
                  href="https://www.facebook.com/dctamc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-primary text-white w-10 h-10 flex items-center justify-center"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </BaseLink>
                <BaseLink
                  href="https://www.youtube.com/@digitalcomputerstrainingac7975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-primary text-white w-10 h-10 flex items-center justify-center"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </BaseLink>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Office Hours</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>Saturday - Thursday</div>
                <div>9:00 AM - 6:00 PM</div>
                <div>Friday</div>
                <div>10:00 AM - 4:00 PM</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
