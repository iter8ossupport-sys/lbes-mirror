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

export const PrivacyPolicy = () => {
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
              PRIVACY POLICY
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base"
          >
            Last Updated: September 26, 2026
          </motion.p>
        </div>

        {/* Content */}
        <div className="border-t border-white/5 pt-16">
          <Section title="1. Who We Are" delay={0.3}>
            <p>
              LBES Mirror (&quot;Mirror&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a software product operated by Yash, based in India. This Privacy Policy explains how we collect, use, and protect information when you use our website and services.
            </p>
            <p>
              For questions about this Privacy Policy or our data practices, contact us at:{' '}
              <a href="mailto:lbes.support@gmail.com" className="text-white hover:underline">
                lbes.support@gmail.com
              </a>
            </p>
          </Section>

          <Section title="2. Information We Collect" delay={0.35}>
            <p>
              Currently, we collect limited information through our Early Access signup form:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong className="text-white">Email address</strong> — required for Early Access registration</li>
              <li><strong className="text-white">Name</strong> — optional</li>
              <li><strong className="text-white">LBES user status</strong> — optional (whether you are an existing LBES user)</li>
              <li><strong className="text-white">Submission timestamp</strong> — automatically recorded when you submit the form</li>
            </ul>
            <p>
              We do not currently collect trading history, broker credentials, account passwords, financial account credentials, CSV files, or payment information through our website.
            </p>
          </Section>

          <Section title="3. How We Use Your Information" delay={0.4}>
            <p>
              We use the information collected for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Managing the Early Access list and communicating about Mirror launch and early access opportunities</li>
              <li>Responding to your enquiries and support requests</li>
              <li>Maintaining the security and functionality of our service</li>
              <li>Complying with applicable legal obligations</li>
            </ul>
          </Section>

          <Section title="4. Data Storage and Infrastructure" delay={0.45}>
            <p>
              Early Access information is stored using Supabase as our application's database and infrastructure provider. We take reasonable steps to protect your information through technical and organizational measures appropriate to the nature of the data.
            </p>
            <p>
              We do not make specific claims about geographic storage locations unless we have verified that information.
            </p>
          </Section>

          <Section title="5. Third-Party Services" delay={0.5}>
            <p>
              Our website may use third-party services for essential functionality. These providers have their own privacy policies, and we encourage you to review them. We only use services necessary for the operation of our website and Early Access functionality.
            </p>
          </Section>

          <Section title="6. Data Retention" delay={0.55}>
            <p>
              We retain information only for as long as reasonably necessary for the stated purposes, or as required by applicable law. When information is no longer needed, we will delete or anonymize it in accordance with our data retention practices.
            </p>
          </Section>

          <Section title="7. Your Rights" delay={0.6}>
            <p>
              Depending on your location and applicable law, you may have rights regarding your personal data, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Requesting access to your personal data</li>
              <li>Requesting correction of inaccurate data</li>
              <li>Requesting deletion of your data</li>
              <li>Objecting to or restricting certain processing</li>
              <li>Data portability</li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <a href="mailto:lbes.support@gmail.com" className="text-white hover:underline">
                lbes.support@gmail.com
              </a>{' '}
              with &quot;Privacy Request&quot; in the subject line. We will respond within a reasonable timeframe in accordance with applicable law.
            </p>
          </Section>

          <Section title="8. Security" delay={0.65}>
            <p>
              We implement reasonable technical and organizational measures to protect collected information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="9. Children's Privacy" delay={0.7}>
            <p>
              LBES Mirror is not directed at children. We do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child without the required parental or guardian consent, we will take steps to delete that information in accordance with applicable law, including the Digital Personal Data Protection Act, 2023 (India) where applicable.
            </p>
            <p>
              Parents or guardians who believe their child&apos;s data has been collected should contact us at{' '}
              <a href="mailto:lbes.support@gmail.com" className="text-white hover:underline">
                lbes.support@gmail.com
              </a>.
            </p>
          </Section>

          <Section title="10. Cookies and Analytics" delay={0.75}>
            <p>
              Our website currently uses minimal technical functionality for essential operation. We do not currently use third-party analytics, advertising cookies, or tracking technologies beyond what is necessary for basic website functionality.
            </p>
            <p>
              If we implement cookies or analytics in the future, we will update this Privacy Policy to reflect those practices.
            </p>
          </Section>

          <Section title="11. International Data Transfers" delay={0.8}>
            <p>
              Your information may be processed by our infrastructure providers in locations outside your country of residence. By using our services, you acknowledge that your information may be transferred to and processed in countries other than your own, in accordance with applicable data protection laws.
            </p>
          </Section>

          <Section title="12. Changes to This Policy" delay={0.85}>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be published on this page with a new effective date. We encourage you to review this page periodically for any changes.
            </p>
          </Section>

          <Section title="13. Grievance Officer & Contact" delay={0.9}>
            <p>
              In accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000 of India, the designated Grievance Officer for privacy and data-related concerns is:
            </p>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 my-4 space-y-1 text-sm">
              <p><strong className="text-white">Grievance Officer:</strong> Yash</p>
              <p><strong className="text-white">Jurisdiction:</strong> India</p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:lbes.support@gmail.com" className="text-orange-400 hover:underline">
                  lbes.support@gmail.com
                </a>
              </p>
              <p className="text-xs text-gray-500 pt-1">
                Please include &quot;Privacy Request&quot; or &quot;Grievance&quot; in the subject line. We acknowledge and address complaints within statutory timelines.
              </p>
            </div>
          </Section>
        </div>

      </div>

      <CTA />

    </div>
  );
};
