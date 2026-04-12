"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { CheckCircle2, XCircle, Send, ArrowRight } from "lucide-react";

const Contact = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // ---------------- FORM SUBMITTING ----------------
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
        setToast({ type: "success", message: "Message securely delivered." });
        form.reset();
      } else {
        setToast({ type: "error", message: "Transmission failed. Try again." });
      }
    } catch {
      setToast({ type: "error", message: "Network interference detected." });
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(null), 4000);
  };

  // ---------------- 3D TILT LOGIC ----------------
  const formRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out raw mouse inputs for premium physics
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to maximum +/- 3 degrees rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  // Calculate dynamic lighting coordinates
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  
  // Magnetic inner highlight
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(189, 79, 244, 0.12) 0%, transparent 70%)`;
  // Magnetic border glow highlight
  const borderBackground = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(255, 255, 255, 0.4) 0%, rgba(189, 79, 244, 0.5) 40%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage values relative to center (-0.5 to 0.5)
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Gracefully snap back to rest state when mouse leaves
    x.set(0);
    y.set(0);
  };

  // 🔥 Premium High-End Floating Label Input Style
  const inputStyle = `
    peer w-full px-5 pt-7 pb-3 rounded-xl
    bg-white/[0.02] backdrop-blur-sm
    border border-white/10
    text-white placeholder-transparent
    outline-none
    focus:border-[#BD4FF4]/50
    focus:bg-[#BD4FF4]/[0.02]
    hover:border-white/20
    transition-all duration-300 ease-out
  `;

  const labelStyle = `
    absolute left-5 top-5 
    text-gray-500 text-sm font-medium tracking-wide
    cursor-text
    peer-placeholder-shown:text-sm peer-placeholder-shown:top-5
    peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-[#BD4FF4] peer-focus:tracking-widest peer-focus:uppercase
    peer-[&:not(:placeholder-shown)]:top-2.5 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-gray-400 peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:uppercase
    transition-all duration-300 pointer-events-none
  `;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
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
          px-6 py-4 rounded-xl
          backdrop-blur-xl border border-white/10 shadow-2xl
          flex items-center gap-3
          max-w-[90vw]
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            toast?.type === "success"
              ? "bg-[#0c0c12] text-white"
              : "bg-[#1a0f12] text-red-200"
          }
        `}
      >
        {toast?.type === "success" ? (
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#BD4FF4]" />
        ) : (
          <XCircle className="w-5 h-5 shrink-0 text-red-400" />
        )}
        <span className="text-sm font-medium tracking-wide">
          {toast?.message}
        </span>
      </motion.div>

      {/* ---------------- CONTACT SECTION ---------------- */}
      <section
        id="contact"
        className="relative pt-24 md:pt-32 pb-24 md:pb-40 bg-[#07070d] overflow-hidden border-t border-white/[0.02]"
      >
        {/* Intentionally restrained background glows */}
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-[#BD4FF4]/5 rounded-full blur-[130px] pointer-events-none translate-x-1/3" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center justify-between max-w-7xl mx-auto"
          >
            {/* LEFT CONTENT */}
            <motion.div variants={itemVariants} className="w-full lg:w-5/12 text-white space-y-12 shrink-0">
              <div className="space-y-6">
                <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase flex items-center gap-4">
                  <span className="w-8 h-px bg-gray-700" />
                  Initiate Dialogue
                </h3>
                
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
                  Let’s Build Something <br/>
                  <span 
                    className="text-transparent bg-clip-text bg-[length:200%_auto] animate-[pan-gradient_3s_linear_infinite]"
                    style={{
                      backgroundImage: "linear-gradient(to right, #BD4FF4, #E48A60, #8b5cf6, #BD4FF4, #E48A60, #8b5cf6, #BD4FF4)"
                    }}
                  >
                    Extraordinary.
                  </span>
                </h2>
                
                <p className="text-gray-400 text-base lg:text-lg font-light leading-relaxed">
                  Every great digital experience begins with a conversation. Whether you have a fully drafted project spec or just an innovative concept—let's explore the architecture together.
                </p>
              </div>

              {/* Minimalist Contact Directory */}
              <div className="flex flex-col gap-6 pl-4 border-l border-white/10">
                <a
                  href="mailto:prakharyadav096@gmail.com"
                  className="group flex flex-col gap-1 items-start w-fit"
                >
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#BD4FF4]/70 transition-colors">Digital Comms</span>
                  <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors flex items-center gap-3">
                    prakharyadav096@gmail.com 
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-[#BD4FF4]" />
                  </span>
                </a>

                <a
                  href="tel:+916390498069"
                  className="group flex flex-col gap-1 items-start w-fit"
                >
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#BD4FF4]/70 transition-colors">Direct Line</span>
                  <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors flex items-center gap-3">
                    +91 6390498069 
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-[#BD4FF4]" />
                  </span>
                </a>
              </div>
            </motion.div>

            {/* RIGHT FORM - 3D Interactive Card Engine */}
            <motion.div 
              variants={itemVariants} 
              className="w-full lg:w-7/12 max-w-2xl mx-auto lg:mx-0"
              style={{ perspective: "2000px" }}
            >
              <motion.div
                ref={formRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                }}
                className="relative bg-[#0c0c12]/80 backdrop-blur-3xl rounded-[2rem] p-8 sm:p-12 border border-white/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_40px_-10px_rgba(0,0,0,0.5)] group/form transition-shadow duration-500 hover:shadow-[0_40px_80px_-20px_rgba(189,79,244,0.15)] will-change-transform"
              >
                {/* 🌟 Dynamic Magnetic Border Glow (Mask Trick) */}
                <motion.div 
                  className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover/form:opacity-100 transition-opacity duration-700"
                  style={{
                    background: borderBackground,
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                />

                {/* 🌟 Dynamic Magnetic Spotlight Layer */}
                <motion.div 
                  className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 mix-blend-screen"
                  style={{ background: spotlightBackground }}
                />
                
                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <input type="hidden" name="access_key" value="eccf24e4-acfa-411e-939e-685bba8c6131" />

                  {/* Name Input */}
                  <div className="relative group">
                    <input type="text" name="name" id="name" required placeholder=" " className={inputStyle} />
                    <label htmlFor="name" className={labelStyle}>Authorized Name</label>
                  </div>

                  {/* Split Row for Email / Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input type="email" name="email" id="email" required placeholder=" " className={inputStyle} />
                      <label htmlFor="email" className={labelStyle}>Secure Email</label>
                    </div>

                    <div className="relative group">
                      <input type="text" name="phone" id="phone" placeholder=" " className={inputStyle} />
                      <label htmlFor="phone" className={labelStyle}>Phone (Optional)</label>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative group">
                    <textarea name="message" id="message" required rows={4} placeholder=" " className={`${inputStyle} resize-none min-h-[140px] pt-8`} />
                    <label htmlFor="message" className={labelStyle}>Project Specification</label>
                  </div>

                  {/* Checkbox Policy */}
                  <label className="flex items-start sm:items-center gap-4 text-xs text-gray-500 cursor-pointer group hover:text-gray-400 transition-colors pt-2">
                    <div className="relative mt-0.5 sm:mt-0 flex items-center justify-center shrink-0">
                      <input type="checkbox" required className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-transparent checked:bg-[#BD4FF4] checked:border-[#BD4FF4] transition-colors cursor-pointer" />
                      <CheckCircle2 className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className="leading-relaxed font-light">
                      I authorize the processing of my designated contact parameters as outlined in the <span className="text-gray-300 border-b border-white/10 group-hover:border-[#BD4FF4] group-hover:text-[#BD4FF4] transition-colors pb-0.5">Privacy Directive</span>.
                    </span>
                  </label>

                  {/* Premium Structural CTA Button */}
                  <button
                    type="submit"
                    className="w-full py-5 mt-4 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-[#BD4FF4] hover:border-[#BD4FF4] text-white font-semibold text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_rgba(189,79,244,0.4)] hover:-translate-y-[2px] transition-all duration-500 group overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Transmit Beacon
                      <div className="relative flex items-center justify-center w-5 h-5 overflow-hidden">
                        {/* Idle Plane */}
                        <Send className="absolute inset-0 w-4 h-4 group-hover:translate-x-[150%] group-hover:-translate-y-[150%] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        {/* Hover Incoming Plane */}
                        <Send className="absolute inset-0 w-4 h-4 -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] text-white" />
                      </div>
                    </span>
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
