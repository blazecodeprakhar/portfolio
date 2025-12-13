"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, CheckCircle2, XCircle } from "lucide-react";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setToast({ type: "success", message: "Your message has been sent!" });
        form.reset();
      } else {
        setToast({ type: "error", message: "Something went wrong. Try again!" });
      }
    } catch {
      setToast({ type: "error", message: "Network error. Please try again!" });
    }

    timeoutRef.current = setTimeout(() => setToast(null), 3000);
  };

  // 🔥 Common input style (focus = purple border)
  const inputStyle = `
    w-full px-4 py-3 rounded-xl
    bg-black/40
    border border-white/10
    text-white placeholder-white/40
    outline-none
    focus:border-[#BD4FF4]
    focus:ring-0
    transition-colors duration-200
  `;

  return (
    <>
      {/* ---------------- TOAST ---------------- */}
      {toast && (
        <div
          className={`
            fixed z-[9999]
            left-1/2 -translate-x-1/2 bottom-5
            md:left-auto md:translate-x-0 md:right-5
            px-5 py-3 rounded-2xl
            backdrop-blur-xl border
            flex items-center gap-3 animate-slide-up
            max-w-[90vw]
            ${
              toast.type === "success"
                ? "bg-[#BD4FF4]/30 border-[#BD4FF4]/40 text-white"
                : "bg-red-500/20 border-red-500/40 text-red-300"
            }
          `}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="text-sm font-medium break-words">
            {toast.message}
          </span>
        </div>
      )}

      {/* ---------------- CONTACT SECTION ---------------- */}
      <section
        id="contact"
        className="pt-16 md:pt-20 pb-20 md:pb-24"
        style={{ backgroundColor: "#0E0E10" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            ref={sectionRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start opacity-0"
          >
            {/* LEFT CONTENT */}
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Let’s Get In Touch.
              </h2>

              <p className="text-white/60 text-lg max-w-md">
                Have a project in mind or just want to say hello?
                You can also reach me directly:
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="mailto:prakharyadav096@gmail.com"
                  className="block text-[#BD4FF4] font-semibold text-lg hover:underline"
                >
                  prakharyadav096@gmail.com
                </a>

                <a
                  href="tel:+916390498069"
                  className="block text-[#BD4FF4] font-semibold text-lg hover:underline"
                >
                  +91 6390498069
                </a>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="snake-border rounded-3xl w-full max-w-lg mx-auto lg:max-w-none">
              <div className="snake-inner bg-[#0E0E10] rounded-3xl p-6 sm:p-7 md:p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="hidden"
                    name="access_key"
                    value="eccf24e4-acfa-411e-939e-685bba8c6131"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    className={inputStyle}
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className={inputStyle}
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className={inputStyle}
                  />

                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Message"
                    className={`${inputStyle} resize-none`}
                  />

                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input type="checkbox" required className="h-4 w-4" />
                    I agree to the{" "}
                    <span className="text-[#BD4FF4]">Privacy Policy</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#BD4FF4] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#a43ad8] transition"
                  >
                    <Mail className="h-5 w-5" />
                    Submit Form
                  </button>
                </form>
              </div>
            </div>
            {/* END FORM */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
