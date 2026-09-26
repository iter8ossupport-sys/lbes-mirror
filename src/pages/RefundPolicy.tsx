import React from 'react';
import { motion } from 'framer-motion';
import { CTA } from '../components/CTA';

const Section = ({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="mb-16"
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 tracking-tight">
      {title}
    </h2>
    <div className="text-gray-400 text-base md:text-lg leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

export const RefundPolicy = () => {
  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full max-w-full">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-orange-600/10 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-24">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
              REFUND POLICY
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Refund Policy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base"
          >
            Last Updated: 26 September 2026
          </motion.p>
        </div>

        {/* Content */}
        <div className="border-t border-white/5 pt-16">
          <Section title="1. Current Status: No Payment Required" delay={0.3}>
            <p>
              LBES Mirror Early Access is currently free and does not require payment.
            </p>
            <p>
              Because no payment is currently required to join Early Access, there is currently no purchase, subscription, or paid service for which a refund is applicable.
            </p>
          </Section>

          <Section title="2. Future Paid Services" delay={0.4}>
            <p>
              If LBES Mirror introduces paid products or subscriptions in the future, the applicable pricing, cancellation, refund, and payment terms will be:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Clearly presented before any payment is made</li>
              <li>Documented in a separate terms and conditions or purchase agreement</li>
              <li>Applicable only to that specific purchase or subscription</li>
            </ul>
            <p>
              Any future refund policy will comply with applicable consumer protection laws and will be communicated to users before payment.
            </p>
          </Section>

          <Section title="3. No Current Refund Claims" delay={0.5}>
            <p>
              Since Early Access is currently free, we do not process refund requests because there are no payments to refund.
            </p>
            <p>
              If you have questions about Early Access or wish to withdraw from the waitlist, you may contact us at lbes.support@gmail.com.
            </p>
          </Section>

          <Section title="4. Contact" delay={0.6}>
            <p>
              For questions about this Refund Policy or future payment terms, please contact:
            </p>
            <p className="text-white font-medium">
              lbes.support@gmail.com
            </p>
          </Section>
        </div>

      </div>

      <CTA />

    </div>
  );
};
