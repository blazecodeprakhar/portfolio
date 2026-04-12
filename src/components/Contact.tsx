"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, XCircle, User, Phone, MessageSquare, Send, ArrowRight } from "lucide-react";

const Contact = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
        setToast({ type: "success", message: "Your message has been sent successfully!" });
        form.reset();
      } else {
        setToast({ type: "error", message: "Something went wrong. Try again!" });
      }
    } catch {
      setToast({ type: "error", message: "Network error. Please try again!" });
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(null), 4000);
  };

  // 🔥 Upgraded Premium Input Style
  const inputStyle = `
    w-full px-4 py-3.5 pl-12 rounded-xl
    bg-white/[0.02] backdrop-blur-md
    border border-white/10
    text-white placeholder-white/30
    outline-none
    focus:border-[#BD4FF4]/60
    focus:bg-white/[0.04]
    focus:shadow-[0_0_20px_rgba(189,79,244,0.15)]
    transition-all duration-300
  `;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      {/* ---------------- TOAST ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: toast ? 1 : 0, y: toast ? 0 : 20, pointerEvents: toast ? "auto" : "none" }}
        className={`
          fixed z-[9999]
          left-1/2 -translate-x-1/2 bottom-10
          md:left-auto md:translate-x-0 md:right-10 md:bottom-10
          px-6 py-4 rounded-2xl
          backdrop-blur-xl border shadow-[0_0_40px_rgba(0,0,0,0.5)]
          flex items-center gap-3
          max-w-[90vw]
          transition-all duration-300
          ${
            toast?.type === "success"
              ? "bg-[#BD4FF4]/20 border-[#BD4FF4]/40 text-white"
              : "bg-red-500/20 border-red-500/40 text-red-200"
          }
        `}
      >
        {toast?.type === "success" ? (
          <CheckCircle2 className="w-6 h-6 shrink-0 text-[#BD4FF4]" />
        ) : (
          <XCircle className="w-6 h-6 shrink-0 text-red-400" />
        )}
        <span className="text-base font-medium break-words">
          {toast?.message}
        </span>
      </motion.div>

      {/* ---------------- CONTACT SECTION ---------------- */}
      <section
        id="contact"
        className="relative pt-24 md:pt-32 pb-24 md:pb-32 bg-gradient-to-b from-[#0a0a10] to-[#07070d] overflow-hidden"
      >
        {/* Soft atmospheric background glow */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#BD4FF4]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-14 items-center max-w-7xl mx-auto"
          >
            {/* LEFT CONTENT */}
            <motion.div variants={itemVariants} className="text-white space-y-8 lg:pr-10">
              <div className="space-y-4">
                <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#BD4FF4] uppercase flex items-center gap-2">
                  <span className="w-8 h-px bg-[#BD4FF4]/50" />
                  Contact Me
                </h3>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Let’s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BD4FF4] to-violet-400 drop-shadow-[0_0_20px_rgba(189,79,244,0.3)]">Extraordinary.</span>
                </h2>
                <p className="text-gray-400 text-lg font-light max-w-md leading-relaxed pt-2">
                  Have an innovative idea, need a technical visionary, or just want to discuss the future of the web? Drop me a message below.
                </p>
              </div>

              {/* Direct Contacts Block */}
              <div className="space-y-5 pt-4 border-l-2 border-white/10 pl-6 relative">
                <div className="absolute left-[-2px] inset-y-0 w-[2px] bg-gradient-to-b from-[#BD4FF4] to-transparent h-1/2" />
                
                <a
                  href="mailto:prakharyadav096@gmail.com"
                  className="group flex flex-col gap-1 items-start w-fit"
                >
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-gray-400 transition-colors">Direct Email</span>
                  <span className="text-xl font-semibold text-white group-hover:text-[#BD4FF4] transition-colors flex items-center gap-2">
                    prakharyadav096@gmail.com <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </span>
                </a>

                <a
                  href="tel:+916390498069"
                  className="group flex flex-col gap-1 items-start w-fit"
                >
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-gray-400 transition-colors">Mobile Support</span>
                  <span className="text-xl font-semibold text-white group-hover:text-[#BD4FF4] transition-colors flex items-center gap-2">
                    +91 6390498069 <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </span>
                </a>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div variants={itemVariants} className="w-full max-w-xl mx-auto lg:max-w-none lg:ml-auto">
              <div className="snake-border rounded-[2rem]">
                <div className="snake-inner bg-[#0d0d14] rounded-[2rem] p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="hidden"
                      name="access_key"
                      value="eccf24e4-acfa-411e-939e-685bba8c6131"
                    />

                    {/* Name Input */}
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BD4FF4] transition-colors duration-300">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Full Name"
                        className={inputStyle}
                      />
                    </div>

                    {/* Split Row for Email / Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BD4FF4] transition-colors duration-300">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Email Address"
                          className={inputStyle}
                        />
                      </div>

                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#BD4FF4] transition-colors duration-300">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          className={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="relative group">
                      <div className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#BD4FF4] transition-colors duration-300">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell me about your project..."
                        className={`${inputStyle} resize-none min-h-[120px]`}
                      />
                    </div>

                    {/* Checkbox Policy */}
                    <label className="flex items-start sm:items-center gap-3 text-sm text-gray-400 cursor-pointer group hover:text-gray-300 transition-colors">
                      <div className="relative mt-1 sm:mt-0 flex items-center justify-center">
                        <input type="checkbox" required className="peer appearance-none w-5 h-5 rounded-md border border-white/20 bg-white/5 checked:bg-[#BD4FF4] checked:border-[#BD4FF4] transition-colors cursor-pointer" />
                        <CheckCircle2 className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                      </div>
                      <span className="leading-tight">
                        I agree to the <span className="text-[#BD4FF4] font-medium border-b border-transparent group-hover:border-[#BD4FF4] transition-colors pb-0.5">Privacy Policy</span>
                      </span>
                    </label>

                    {/* CTA Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#BD4FF4] to-violet-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(189,79,244,0.4)] transform hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative"
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
                      
                      <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                        Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
            {/* END FORM */}
          </motion.div>
        </div>
      </section>

      {/* Required Keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(50%); }
        }
      `}</style>
    </>
  );
};

export default Contact;
