"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ToastProvider";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// eslint-disable-next-line max-lines-per-function, complexity
const Contact = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    if (email.trim().length > 100) {
      return "Email must be less than 100 characters";
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) {
      return "Message is required";
    }
    if (message.trim().length < 10) {
      return "Message must be at least 10 characters";
    }
    if (message.trim().length > 1000) {
      return "Message must be less than 1000 characters";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) {
      newErrors.name = nameError;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const messageError = validateMessage(formData.message);
    if (messageError) {
      newErrors.message = messageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let error: string | undefined;

    if (name === "name") {
      error = validateName(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "message") {
      error = validateMessage(value);
    }

    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField =
        Object.keys(errors)[0] || Object.keys(validateForm() ? {} : errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        throw new Error(
          "Web3Forms access key is not configured. Please add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment variables."
        );
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          form_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.showSuccess(
          `Thank you for your message, ${formData.name}! I'll get back to you soon.`,
          6000
        );
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.showError(
        "Sorry, there was an error sending your message. Please try again or contact me directly via email.",
        7000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abhijeetchandak10@gmail.com",
      href: "mailto:abhijeetchandak10@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9604237799",
      href: "tel:+919604237799",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pune, India",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50/80 via-white/60 to-slate-100/80 dark:from-dark-900/80 dark:via-dark-800/60 dark:to-dark-900/80 backdrop-blur-sm relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 gradient-text px-4">
            Get In Touch
          </h2>
          <div className="w-24 md:w-32 h-1 md:h-1.5 bg-slate-900 dark:bg-slate-300 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-slate-700 dark:text-slate-100 text-base md:text-lg max-w-2xl mx-auto px-4">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be
            part of your vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
              Let&apos;s Connect
            </h3>
            <p className="text-slate-700 dark:text-slate-100 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Feel free to reach out if you&apos;re looking for a developer, have a question, or
              just want to connect. I&apos;m always open to discussing new projects and
              opportunities.
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center p-4 md:p-5 glass rounded-xl border border-slate-300 dark:border-dark-600/50 hover:border-slate-500 dark:hover:border-slate-600 card-hover group shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-800"
                >
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 dark:bg-slate-800 rounded-xl flex items-center justify-center mr-3 md:mr-4 group-hover:scale-110 transition-transform shadow-lg shadow-slate-900/30 dark:shadow-slate-800/30 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <info.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-700 dark:text-slate-200 text-xs md:text-sm font-medium">
                      {info.label}
                    </p>
                    <p className="text-slate-900 dark:text-white font-semibold text-sm md:text-base truncate">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block text-slate-800 dark:text-slate-200 mb-2 font-semibold"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3.5 glass border rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name
                        ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-400/30"
                        : "border-slate-300 dark:border-dark-600/50 focus:border-slate-500 dark:focus:border-slate-600 focus:ring-slate-400/30"
                    }`}
                    placeholder="Your Name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                {errors.name && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    {errors.name}
                  </motion.p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-slate-800 dark:text-slate-200 mb-2 font-semibold"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3.5 glass border rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email
                        ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-400/30"
                        : "border-slate-300 dark:border-dark-600/50 focus:border-slate-500 dark:focus:border-slate-600 focus:ring-slate-400/30"
                    }`}
                    placeholder="your.email@example.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    {errors.email}
                  </motion.p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-slate-800 dark:text-slate-200 mb-2 font-semibold"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    className={`w-full px-4 py-3.5 glass border rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-400/30"
                        : "border-slate-300 dark:border-dark-600/50 focus:border-slate-500 dark:focus:border-slate-600 focus:ring-slate-400/30"
                    }`}
                    placeholder="Your Message"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <div className="absolute right-3 top-3">
                      <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <motion.p
                      id="message-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      {errors.message}
                    </motion.p>
                  ) : (
                    <div></div>
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formData.message.length}/1000
                  </p>
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 text-white rounded-lg font-semibold text-sm shadow-md dark:shadow-lg dark:shadow-slate-700/40 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-xl dark:hover:shadow-slate-600/50 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                whileHover={isSubmitting ? {} : { scale: 1.05 }}
                whileTap={isSubmitting ? {} : { scale: 0.95 }}
                aria-label="Submit contact form"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <h3 className="text-xl md:text-2xl font-display font-semibold text-slate-900 dark:text-white mb-6 md:mb-8">
            Connect With Me
          </h3>
          <div className="flex justify-center items-center gap-6 md:gap-8">
            <motion.a
              href="mailto:abhijeetchandak10@gmail.com"
              className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 rounded"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Send me an email"
              title="Email"
            >
              <Mail className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="tel:+919604237799"
              className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 rounded"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Call me at +91 9604237799"
              title="Phone"
            >
              <Phone className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/abhijeet-chandak-066279207"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 rounded"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Visit my LinkedIn profile (opens in new tab)"
              title="LinkedIn"
            >
              <Linkedin className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://github.com/abhijeet-chandak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 rounded"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Visit my GitHub profile (opens in new tab)"
              title="GitHub"
            >
              <Github className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
