import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Youtube, Globe, MessageCircle } from 'lucide-react';
import { CTA } from '../components/CTA';
import { GradientBorder } from '../components/ui/GradientBorder';
import { RollingText } from '../components/ui/RollingText';

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  label: string;
  delay: number;
}

const ContactCard = ({ icon: Icon, title, description, href, label, delay }: ContactCardProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:border-white/20 transition-all duration-300 group h-full"
  >
    <div className="flex items-start gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0">
        <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400 break-all">{description}</p>
      </div>
    </div>
    <div className="mt-auto pt-2">
      <GradientBorder
        gradient="from-orange-500 via-red-500 to-orange-600"
        containerClassName="rounded-xl p-[1px] w-full"
      >
        <span className="w-full py-3 bg-[#0F0F0F] text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 group-hover:bg-black transition-colors">
          <RollingText text={label} />
        </span>
      </GradientBorder>
    </div>
  </motion.a>
);

export const Contact = () => {
  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full max-w-full">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-orange-600/10 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
              CONTACT
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Questions about Mirror?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            For early access, product questions, partnership inquiries, or support, connect with us through our official channels.
          </motion.p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <ContactCard
            icon={Mail}
            title="Email Support"
            description="lbes.support@gmail.com"
            href="mailto:lbes.support@gmail.com"
            label="Send Email"
            delay={0.2}
          />
          <ContactCard
            icon={Twitter}
            title="X (Twitter)"
            description="@yash0to1"
            href="https://x.com/yash0to1"
            label="Follow on X"
            delay={0.25}
          />
          <ContactCard
            icon={Linkedin}
            title="LinkedIn"
            description="Yash Tyagi"
            href="https://www.linkedin.com/in/yash-tyagi-089a49345/?utm_source=gemini"
            label="Connect on LinkedIn"
            delay={0.3}
          />
          <ContactCard
            icon={Youtube}
            title="YouTube"
            description="@ZerotoSaaS"
            href="https://www.youtube.com/@ZerotoSaaS"
            label="Watch on YouTube"
            delay={0.35}
          />
          <ContactCard
            icon={Globe}
            title="LBES Platform"
            description="www.lbes.space"
            href="https://www.lbes.space"
            label="Visit LBES Space"
            delay={0.4}
          />
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp Support"
            description="T-T Support Channel"
            href="https://whatsapp.com/channel/0029VbASdkj90x2rc9CPHM27"
            label="Join on WhatsApp"
            delay={0.45}
          />
        </div>

        {/* Privacy Requests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-3">
                Privacy Requests & Inquiries
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                For questions about personal-data processing or privacy requests, contact us directly at{' '}
                <a
                  href="mailto:lbes.support@gmail.com"
                  className="text-orange-400 hover:text-orange-300 font-medium underline underline-offset-2"
                >
                  lbes.support@gmail.com
                </a>{' '}
                and include <span className="text-white font-medium">&quot;Privacy Request&quot;</span> in the subject line.
              </p>
              <p className="text-sm text-gray-500">
                We respond within a reasonable timeframe in accordance with applicable data protection laws.
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      <CTA />

    </div>
  );
};
