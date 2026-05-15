"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Booking from "@/components/ui/booking";

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<{
    type: string;
    date: Date;
    time: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toDateStr = (date: Date): string =>
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Contact API
      const contactRes = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });
      if (!contactRes.ok) throw new Error("Contact submission failed.");

      // 2. Newsletter subscribe
      fetch("http://localhost:8000/api/newsletter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      }).catch(() => {});

      // 3. Booking API (only if user picked a slot)
      if (bookingData) {
        const bookingRes = await fetch("http://localhost:8000/api/bookings/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            date: toDateStr(bookingData.date),
            start_time: bookingData.time,
          }),
        });
        if (!bookingRes.ok) {
          const data = await bookingRes.json();
          throw new Error(data.error || "Booking failed. Please pick another slot.");
        }
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBook = (data: { type: string; date: Date; time: string }) => {
    setBookingData(data);
  };

  if (submitted) {
    return (
      <div className={cn("text-center py-16", className)}>
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-accent/10">
          <CheckCircle size={32} className="text-accent" />
        </div>
        <h3 className="text-2xl font-display text-text mb-3">
          Thank you for reaching out
        </h3>
        <p className="text-text-muted max-w-md mx-auto">
          {bookingData
            ? "Your message and booking are confirmed. Check your email for the calendar invite."
            : "We've received your message and will get back to you within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)} noValidate>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-2">
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={cn(
            "w-full px-4 py-3.5 text-base bg-surface border rounded-xl text-text placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
            errors.name ? "border-red-400" : "border-border"
          )}
          placeholder="Your name"
          autoComplete="name"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1.5" role="alert">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-2">
          Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={cn(
            "w-full px-4 py-3.5 text-base bg-surface border rounded-xl text-text placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
            errors.email ? "border-red-400" : "border-border"
          )}
          placeholder="you@company.com"
          autoComplete="email"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1.5" role="alert">{errors.email}</p>}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="contact-company" className="block text-sm font-medium text-text mb-2">
          Company
        </label>
        <input
          type="text"
          id="contact-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3.5 text-base bg-surface border border-border rounded-xl text-text placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          placeholder="Your company"
          autoComplete="organization"
        />
      </div>

      {/* Booking */}
      <Booking onBook={handleBook} />

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text mb-2">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={cn(
            "w-full px-4 py-3.5 text-base bg-surface border rounded-xl text-text placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y",
            errors.message ? "border-red-400" : "border-border"
          )}
          placeholder="Tell us about your project..."
        />
        {errors.message && <p className="text-sm text-red-500 mt-1.5" role="alert">{errors.message}</p>}
      </div>

      {submitError && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{submitError}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-accent text-white rounded-full hover:bg-accent/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}