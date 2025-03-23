"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function ContactForm() {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const subject = (
      form.elements.namedItem("subject") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLInputElement
    ).value.trim();

    emailjs
      .send(
        "dcta",
        "dcta_contact",
        { name, email, subject, message },
        {
          publicKey: "sSfKmZ_QCeyBKmoXJ",
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "Your message has been sent successfully!",
        });
        form.reset();
        setSubmitDisabled(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error Sending Message",
          text: "Failed to send your message. Please try again later.",
        });
        console.log(error);
        setSubmitDisabled(false);
      });
  };

  return (
    <form className="space-y-4" onSubmit={handleContactSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <Input
            id="name"
            placeholder="Write your name"
            className="bg-background"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Write your email"
            className="bg-background"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block font-medium">
          Subject
        </label>
        <Input
          id="subject"
          placeholder="Subject"
          className="bg-background"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block font-medium">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Write your message"
          className="min-h-[150px] resize-none bg-background"
          required
        />
      </div>
      <Button
        size="lg"
        type="submit"
        className="w-full cursor-pointer select-none"
        disabled={submitDisabled}
      >
        Send Message
      </Button>
    </form>
  );
}
