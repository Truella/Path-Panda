'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react'; // using lucide-react for icons

const faqs = [
  {
    question: 'What is PathPanda?',
    answer:
      'PathPanda is a platform that helps you manage projects, track progress, and collaborate effectively.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Simply sign up, set up your profile, and explore the dashboard to get started quickly.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Yes, we use enterprise-grade security protocols to keep your information safe and private.',
  },
];

export default function FaqAccordion() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#2d2d2f] text-center">FAQs</h2>
        <p className="mt-2 text-[#2d2d2f]/80 text-center">
          Frequently asked questions about PathPanda
        </p>

        <Accordion.Root type="single" collapsible className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border border-[#e0dce8] rounded-lg overflow-hidden"
            >
              <Accordion.Header className="bg-[#f9f7fe] px-6 py-4 cursor-pointer flex items-center justify-between">
                <Accordion.Trigger className="w-full text-left text-[#2d2d2f] font-medium hover:text-[#7a5e46] transition-colors duration-300 flex justify-between items-center">
                  {faq.question}
                  <ChevronDown className="ml-2 transition-transform duration-300 data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 py-4 text-[#2d2d2f]/80 bg-white">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
