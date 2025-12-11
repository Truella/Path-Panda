'use client';

import { motion } from 'framer-motion';

export default function AboutContent() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 grid gap-20 lg:gap-28">

        {/* Our Mission */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f]">Our Mission</h2>
          <p className="mt-6 text-xl md:text-2xl text-[#2d2d2f]/70 leading-relaxed max-w-3xl mx-auto">
            To empower developers and product teams with{' '}
            <motion.span 
              className="text-[#7a5e46] font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              beautiful, intuitive onboarding experiences
            </motion.span>{' '}
            that inspire confidence from the very first interaction.
          </p>
        </motion.div>

        {/* What Makes Us Different */}
        <div>
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-[#2d2d2f] text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What Makes Us Different
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Ultra-light embeddable script (<10KB)",
              "Smooth animations powered by Framer Motion",
              "Real-time analytics & heatmaps",
              "No-code step builder",
              "Clean, modern dashboard",
              "Branching logic & personalization",
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 bg-[#f9f7fe] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1,
                  ease: "easeOut" 
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-[#7a5e46] rounded-full shrink-0 flex items-center justify-center text-white font-bold text-lg"
                  initial={{ rotate: -180, scale: 0 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {i + 1}
                </motion.div>
                <p className="text-lg font-medium text-[#2d2d2f]">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Team */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f]">The Team</h2>
          <p className="mt-6 text-xl md:text-2xl text-[#2d2d2f]/70 leading-relaxed max-w-3xl mx-auto">
            A collaboration of passionate frontend engineers working together to create a{' '}
            <motion.span 
              className="text-[#7a5e46] font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              complete onboarding ecosystem
            </motion.span>{' '}
            — from marketing site to dashboard to the embeddable widget.
          </p>
        </motion.div>

        {/* Our Vision – the money shot */}
        <motion.div 
          className="bg-linear-to-r from-[#7a5e46] to-[#a67c52] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated background shimmer */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          
          <motion.h2 
            className="text-4xl md:text-6xl font-black relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Vision
          </motion.h2>
          
          <motion.p 
            className="mt-8 text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            To make onboarding experiences accessible, customizable, and powerful for{' '}
            <motion.span 
              className="underline decoration-white/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              every product
            </motion.span>{' '}
            — no matter the size or complexity.
          </motion.p>

          {/* Animated decorative elements */}
          <motion.div
            className="absolute top-8 right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

      </div>
    </section>
  );
}