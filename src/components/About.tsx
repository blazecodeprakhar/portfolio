import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Briefcase, GraduationCap, Github, Linkedin, Download, 
  Shield, Cpu, Award, MapPin, Mail, Phone, Code2, Server, Database, Cloud
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "certifications">("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "timeline", label: "Timeline" },
    { id: "certifications", label: "Certifications" }
  ] as const;

  const personalInfo = [
    { icon: MapPin, text: "Dehradun, India", color: "text-purple-400" },
    { icon: Mail, text: "prakharyadav096@gmail.com", href: "mailto:prakharyadav096@gmail.com", color: "text-fuchsia-400" },
    { icon: Phone, text: "+91 6390498069", href: "tel:+916390498069", color: "text-violet-400" }
  ];

  const pillars = [
    {
      title: "Full-Stack Development",
      description: "Designing and deploying production-ready web applications. Building RESTful APIs and secure authentication systems using React, Node.js, Express, MongoDB, and Firebase.",
      icon: Code2,
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400"
    },
    {
      title: "Cybersecurity",
      description: "Practiced in network hacking, web penetration testing (OWASP Top 10), and post-exploitation using Kali Linux, Metasploit, Burp Suite, Wireshark, and Nmap.",
      icon: Shield,
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400"
    },
    {
      title: "Machine Learning & AI",
      description: "Building and deploying regression, classification, and deep learning models (ANN, CNN). Experience integrating AI capabilities and automating CI/CD with AWS SageMaker.",
      icon: Cpu,
      color: "from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-400"
    }
  ];

  const timeline = [
    {
      type: "experience",
      title: "Full-Stack Developer",
      subtitle: "Freelance",
      date: "June 2025 - Present",
      points: [
        "Designed and deployed responsive full-stack applications using React, Node.js, Express, and databases.",
        "Built secure RESTful APIs and integrated Firebase / MongoDB authentication.",
        "Followed modern UI/UX design standards for seamless cross-browser compatibility."
      ],
      icon: Briefcase,
      color: "border-fuchsia-500/40 text-fuchsia-400"
    },
    {
      type: "education",
      title: "B.Tech - Computer Science & Engineering",
      subtitle: "DIT University | Dehradun, India",
      date: "Expected May 2028",
      points: [
        "Specializing in Cyber Security and Privacy.",
        "Gaining structured foundations in algorithms, system design, security protocols, and AI applications."
      ],
      icon: GraduationCap,
      color: "border-violet-500/40 text-violet-400"
    }
  ];

  const certifications = [
    {
      title: "Learn Ethical Hacking From Scratch",
      provider: "Udemy | zSecurity",
      duration: "15 hours",
      year: "2025",
      color: "border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/5"
    },
    {
      title: "Website Hacking and Penetration Testing",
      provider: "Udemy | zSecurity",
      duration: "10 hours",
      year: "2025",
      color: "border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/5"
    },
    {
      title: "Machine Learning A-Z: AI, Python & AWS",
      provider: "Udemy | Kirill Eremenko",
      duration: "49.5 hours",
      year: "2026",
      color: "border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/5"
    },
    {
      title: "Deep Learning A-Z: Neural Networks & AI",
      provider: "Udemy | Kirill Eremenko",
      duration: "23 hours",
      year: "2026",
      color: "border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/5"
    }
  ];

  const skills = [
    { name: "React / Frontend", icon: Code2, color: "text-purple-400" },
    { name: "Node.js / Express", icon: Server, color: "text-fuchsia-400" },
    { name: "MongoDB / Firebase", icon: Database, color: "text-violet-400" },
    { name: "Cybersecurity & Kali", icon: Shield, color: "text-cyan-400" },
    { name: "Python / ML / DL", icon: Cpu, color: "text-purple-300" },
    { name: "AWS & SageMaker", icon: Cloud, color: "text-fuchsia-300" }
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#07070d] overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/3 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3" />
      <div className="absolute bottom-1/3 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-purple-400 uppercase mb-3">
            About Me
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Behind The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-400">Profile</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT PANEL - Profile Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="glass p-6 sm:p-8 rounded-[2rem] border border-white/[0.05] bg-white/[0.01] relative overflow-hidden flex flex-col items-center text-center lg:text-left lg:items-start gap-6">
              {/* Decorative top accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-500" />
              
              {/* Profile Image Container */}
              <div className="relative group w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d18] shadow-2xl shrink-0">
                <img
                  src="/assets/dp.jpeg"
                  alt="Prakhar Yadav"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Identity info */}
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-white tracking-tight">Prakhar Yadav</h4>
                <p className="text-xs text-purple-400 font-mono tracking-widest uppercase">Student & Developer</p>
              </div>

              {/* Contact Directory list */}
              <div className="w-full border-t border-white/[0.06] pt-6 flex flex-col gap-4 text-sm text-gray-400">
                {personalInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-3 justify-center lg:justify-start">
                    <info.icon className={`w-4 h-4 shrink-0 ${info.color}`} />
                    {info.href ? (
                      <a href={info.href} className="hover:text-white transition-colors truncate">
                        {info.text}
                      </a>
                    ) : (
                      <span className="truncate">{info.text}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Resume CTA & Social Icons */}
              <div className="w-full pt-2 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3">
                <a
                  href="/Prakhar_Resume.pdf"
                  download="Prakhar_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 text-white font-medium text-xs tracking-widest uppercase transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://github.com/blazecodeprakhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/20 text-gray-300 hover:text-white transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prakhar-yadav096/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/20 text-gray-300 hover:text-white transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Interactive Tabs */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tabs Selector Navigation */}
            <div className="grid grid-cols-3 lg:flex p-1 rounded-xl bg-white/[0.02] border border-white/10 w-full lg:w-fit gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-1.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-white bg-purple-600/20 border border-purple-500/30"
                      : "text-gray-400 hover:text-white border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents Frame */}
            <div className="min-h-[360px] lg:min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* OVERVIEW PANEL */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-white tracking-tight">Focus & Objectives</h4>
                        <p className="text-gray-400 leading-relaxed text-base font-light text-justify sm:text-left">
                          B.Tech Computer Science student specializing in Cyber Security & Privacy at DIT University. Equipped with hands-on full-stack development capability, cybersecurity fundamentals, and model construction skills in AI & Machine Learning.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {pillars.map((pillar, idx) => (
                          <div 
                            key={idx} 
                            className="p-4 sm:p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] flex flex-col gap-3 sm:gap-4 hover:border-white/10 hover:bg-white/[0.02] transition-all"
                          >
                            <div className={`p-2.5 rounded-lg w-fit bg-gradient-to-br ${pillar.color}`}>
                              <pillar.icon className="w-5 h-5" />
                            </div>
                            <h5 className="text-white font-bold text-sm tracking-wide">{pillar.title}</h5>
                            <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{pillar.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TIMELINE PANEL */}
                  {activeTab === "timeline" && (
                    <div className="space-y-8 pl-2">
                      <div className="relative border-l border-white/10 pl-4 sm:pl-6 space-y-8 sm:space-y-10 py-2">
                        {timeline.map((item, idx) => (
                          <div key={idx} className="relative group">
                            {/* Accent Dot */}
                            <div className={`absolute -left-[25px] sm:-left-[31px] bg-[#07070d] border ${item.color} p-1 rounded-full group-hover:scale-110 transition-transform`}>
                              <div className="w-1.5 h-1.5 bg-current rounded-full" />
                            </div>
                            
                            {/* Card Content */}
                            <div className="space-y-3">
                              <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{item.date}</span>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <h4 className="text-white font-bold text-base sm:text-lg tracking-tight">{item.title}</h4>
                                <span className="hidden sm:inline text-gray-600">|</span>
                                <span className="text-xs sm:text-sm text-purple-400/80 font-medium">{item.subtitle}</span>
                              </div>
                              <ul className="text-xs sm:text-sm text-gray-400 space-y-1.5 list-disc list-inside leading-relaxed font-light">
                                {item.points.map((pt, pIdx) => (
                                  <li key={pIdx}>{pt}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CERTIFICATIONS PANEL */}
                  {activeTab === "certifications" && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h4 className="text-2xl font-bold text-white tracking-tight">Credentials</h4>
                        <p className="text-xs text-gray-500 font-light">Certified credentials validating specialization areas.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {certifications.map((cert, idx) => (
                          <div
                            key={idx}
                            className={`p-4 sm:p-5 rounded-2xl border bg-white/[0.01] transition-all duration-300 flex flex-col justify-between gap-3 sm:gap-4 ${cert.color} group`}
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-start gap-2">
                                <h5 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-purple-300 transition-colors">
                                  {cert.title}
                                </h5>
                                <span className="text-[10px] text-gray-500 font-mono shrink-0">{cert.year}</span>
                              </div>
                              <p className="text-[11px] sm:text-xs text-gray-400 font-medium">{cert.provider}</p>
                            </div>
                            <span className="text-[10px] text-purple-400 font-mono tracking-wider bg-purple-500/10 px-2 py-0.5 rounded w-fit uppercase">
                              {cert.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STATIC SKILLS DRAWER - Always Visible underneath */}
            <div className="border-t border-white/[0.06] pt-8 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-widest uppercase">
                Core Stack & Arsenal
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-300 cursor-default group"
                  >
                    <skill.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${skill.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-[11px] sm:text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
