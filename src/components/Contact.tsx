"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, CheckCircle2, XCircle } from "lucide-react";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () =>
      sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  // ------------ SUBMIT FUNCTION (AJAX NO REDIRECT) ------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setToast({
        type: "success",
        message: "Your message has been sent!",
      });
      e.target.reset();
    } else {
      setToast({
        type: "error",
        message: "Something went wrong. Try again!",
      });
    }

    setTimeout(() => setToast(null), 3500);
  };

  return (
    <>
      {/* ------------------- TOAST (PREMIUM DESIGN) ------------------- */}
      {toast && (
        <div
          className={`
            fixed bottom-5 right-5 z-[9999]
            px-5 py-3 rounded-2xl shadow-xl
            backdrop-blur-xl border
            flex items-center gap-3 animate-slide-up
            ${
              toast.type === "success"
                ? "bg-[#BD4FF4]/30 border-[#BD4FF4]/40 text-white"
                : "bg-red-500/20 border-red-500/40 text-red-300"
            }
          `}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* --------------------- CONTACT SECTION --------------------- */}
      <section
        id="contact"
        className="pb-20 md:pb-28 pt-10"
        style={{ backgroundColor: "#0E0E10" }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start opacity-0"
          >

{/* LEFT SIDE TEXT */}
<div className="text-white space-y-5">

  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
    Let’s Get In Touch.
  </h2>

  <p className="text-white/60 text-lg max-w-md">
    Or contact me manually at:
  </p>

  <div className="space-y-1">

    {/* CLICKABLE EMAIL */}
    <a
      href="mailto:prakharyadav096@gmail.com"
      className="text-[#BD4FF4] font-semibold text-lg block hover:underline underline-offset-4 transition"
    >
      prakharyadav096@gmail.com
    </a>

    {/* CLICKABLE PHONE */}
    <a
      href="tel:+916390498069"
      className="text-[#BD4FF4] font-semibold text-lg block hover:underline underline-offset-4 transition"
    >
      +91 6390498069
    </a>

  </div>
</div>


            {/* RIGHT SIDE FORM BOX */}
            <div
              className="rounded-3xl p-[2px] shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, #BD4FF4 0%, transparent 70%)",
              }}
            >
              <div className="bg-[#0E0E10] rounded-3xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* WEB3FORMS KEY */}
                  <input
                    type="hidden"
                    name="access_key"
                    value="eccf24e4-acfa-411e-939e-685bba8c6131"
                  />

                  {/* FULL NAME */}
                  <div className="space-y-1">
                    <label className="text-white text-sm">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your full name..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/40 outline-none focus:border-[#BD4FF4] transition"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-1">
                    <label className="text-white text-sm">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/40 outline-none focus:border-[#BD4FF4] transition"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="space-y-1">
                    <label className="text-white text-sm">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 XXXXX-XXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/40 outline-none focus:border-[#BD4FF4] transition"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="space-y-1">
                    <label className="text-white text-sm">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Enter your message..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/40 outline-none focus:border-[#BD4FF4] transition"
                    ></textarea>
                  </div>

                  {/* CHECKBOX */}
                  <label className="flex items-center space-x-2 text-white/80 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded bg-white/10 border border-white/20"
                    />
                    <span>
                      I agree to the{" "}
                      <span className="text-[#BD4FF4]">Privacy Policy</span>.
                    </span>
                  </label>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full mt-4 py-3 rounded-full bg-[#BD4FF4] text-white font-semibold hover:bg-[#a43ad8] transition shadow-xl flex items-center justify-center gap-2"
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
