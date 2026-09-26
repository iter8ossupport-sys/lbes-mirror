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

export const TermsConditions = () => {
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
              LEGAL
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Terms & Conditions
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
          <Section title="1. Acceptance of Terms" delay={0.3}>
            <p>
              These Terms & Conditions govern access to and use of LBES Mirror ("Mirror"), a software product provided by [LEGAL OPERATOR NAME]. By accessing or using Mirror, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use Mirror.
            </p>
          </Section>

          <Section title="2. What Mirror Does" delay={0.35}>
            <p>
              Mirror is software for comparing a user's documented trading strategy with historical trading data and presenting descriptive analysis of alignment, divergence, and data limitations. Mirror helps traders understand where their actual trading behavior matches, differs from, or cannot be verified against their defined strategy rules.
            </p>
          </Section>

          <Section title="3. What Mirror Does NOT Do" delay={0.4}>
            <p>
              Mirror is not:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>A broker or brokerage service</li>
              <li>An investment adviser</li>
              <li>A portfolio manager</li>
              <li>A trading signal service</li>
              <li>A trading execution service</li>
              <li>Personalized investment advice</li>
              <li>A guarantee of future trading performance</li>
            </ul>
            <p>
              Mirror does not tell users what trades to take, when to enter or exit positions, or how to allocate capital.
            </p>
          </Section>

          <Section title="4. Historical Analysis Only" delay={0.45}>
            <p>
              Mirror's analysis is based on historical information supplied by you and the data you provide. Historical observations describe what happened in the past. They do not predict future results, and past behavior does not guarantee future performance.
            </p>
          </Section>

          <Section title="5. Data Accuracy and Limitations" delay={0.5}>
            <p>
              The accuracy and usefulness of Mirror's analysis depends on:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>The accuracy of your strategy definition</li>
              <li>The completeness and accuracy of uploaded trading data</li>
              <li>Available fields, timestamps, and instrument information</li>
              <li>Data quality and consistency</li>
              <li>Which rules can or cannot be objectively verified from the data</li>
            </ul>
            <p>
              Where data cannot establish whether a rule was followed, Mirror may classify the result as unknown or insufficient evidence. Mirror does not infer or guess information that is not present in the data you provide.
            </p>
          </Section>

          <Section title="6. User Responsibilities" delay={0.55}>
            <p>
              You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Providing information you have the right to provide</li>
              <li>Ensuring uploaded trading data is your own or lawfully obtained</li>
              <li>Reviewing and interpreting results yourself</li>
              <li>Making your own decisions based on the information Mirror provides</li>
              <li>Maintaining copies of important records and data</li>
            </ul>
          </Section>

          <Section title="7. No Financial Advice" delay={0.6}>
            <p>
              Mirror does not provide financial, investment, trading, tax, legal, or other professional advice. The information and analysis Mirror provides is for informational purposes only. You should consult with qualified professionals before making any financial or investment decisions.
            </p>
          </Section>

          <Section title="8. No Performance Guarantee" delay={0.65}>
            <p>
              Mirror does not guarantee:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Profitability</li>
              <li>Improved trading performance</li>
              <li>Reduced losses</li>
              <li>Higher win rate</li>
              <li>Lower drawdown</li>
              <li>Successful strategy execution</li>
              <li>Future trading results</li>
            </ul>
          </Section>

          <Section title="9. Strategy Changes" delay={0.7}>
            <p>
              If Mirror allows you to edit or refine strategy rules, any change is made by you. Mirror does not automatically determine your optimal strategy. You remain responsible for all decisions about your strategy, including whether to modify, keep, or remove any rule.
            </p>
          </Section>

          <Section title="10. Third-Party Services" delay={0.75}>
            <p>
              Mirror may depend on third-party infrastructure and services, including hosting providers, databases, analytics services, storage providers, payment processors, and communication services. We are not responsible for the actions, omissions, or failures of third-party services.
            </p>
          </Section>

          <Section title="11. Intellectual Property" delay={0.8}>
            <p>
              The Mirror website, software, branding, and content are owned or licensed by Yash (India) and protected by intellectual property laws. You retain ownership of the strategy definitions and trading data you submit. By using Mirror, you grant us a limited license to process your data solely for the purpose of providing the service.
            </p>
          </Section>

          <Section title="12. Acceptable Use" delay={0.85}>
            <p>
              You must not:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Misuse the service or use it for unlawful purposes</li>
              <li>Attempt unauthorized access to the service or its systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Upload unlawful, harmful, or malicious material</li>
              <li>Submit data you do not have rights to use</li>
              <li>Attempt to compromise the security or integrity of the service</li>
            </ul>
          </Section>

          <Section title="13. Availability" delay={0.9}>
            <p>
              We do not guarantee that Mirror will always be available, uninterrupted, or error-free. The service may change, be interrupted, or become unavailable at any time, including for maintenance, updates, or technical issues.
            </p>
          </Section>

          <Section title="14. Limitation of Liability" delay={0.95}>
            <p>
              To the maximum extent permitted by applicable law, Yash (India) shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use Mirror.
            </p>
            <p>
              This limitation applies regardless of the legal theory under which such damages are sought, and even if we have been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or limitation of certain liabilities, so some of the above limitations may not apply to you.
            </p>
          </Section>

          <Section title="15. Changes to Terms" delay={1.0}>
            <p>
              We may update these Terms from time to time. The updated version will be published on this page with a new effective date. Your continued use of Mirror after any changes means you accept the updated Terms.
            </p>
          </Section>

          <Section title="16. Governing Law" delay={1.05}>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </Section>

          <Section title="17. Contact" delay={1.1}>
            <p>
              If you have any questions about these Terms, please contact us at:
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
