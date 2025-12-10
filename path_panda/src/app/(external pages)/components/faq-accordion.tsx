'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: 'What exactly does PathPanda do?',
    answer:
      'We let you create beautiful, interactive product tours that guide your users step-by-step — highlighting buttons, explaining features, and boosting activation — all without writing a single line of code.',
  },
  {
    question: 'Do I need to be a developer to use it?',
    answer:
      'Not at all. Everything is point-and-click in your dashboard. Just paste one tiny script and your tours go live instantly.',
  },
  {
    question: 'Will it work with my tech stack?',
    answer:
      'Yes — React, Next.js, Vue, Webflow, WordPress, Shopify, plain HTML… if it runs in a browser, PathPanda works flawlessly.',
  },
  {
    question: 'Does it slow down my website?',
    answer:
      'Never. The script is <10 KB, loads asynchronously, and only activates when a user needs a tour. Most users won’t even know it’s there.',
  },
  {
    question: 'How are tours targeted to the right users?',
    answer:
      'Full control: show tours on specific pages, after X seconds, on exit intent, for new users only, returning visitors, or via manual trigger.',
  },
  {
    question: 'Is my data secure?',
    answer:
      '100%. We use encryption in transit and at rest. We never sell your data. You own your tours and analytics.',
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section className="bg-linear-to-b from-white to-[#f9f7fe] py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-[#2d2d2f]">
            Got Questions?
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-[#2d2d2f]/70">
            We’ve got answers. Everything you need to know about PathPanda.
          </p>
        </div>

        {/* Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          value={openItem ?? undefined}
          onValueChange={setOpenItem}
          className="space-y-5"
        >
          {faqs.map((faq, index) => {
            const isOpen = openItem === `item-${index}`;

            return (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="group"
              >
                <Accordion.Header className="w-full">
                  <Accordion.Trigger
                    className={`
                      w-full px-8 py-6 bg-white rounded-2xl shadow-md border border-transparent
                      flex items-center justify-between text-left font-medium text-xl
                      transition-all duration-500 ease-out
                      hover:shadow-xl hover:border-[#7a5e46]/20 hover:bg-[#fef9f5]
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7a5e46]/20
                      data-[state=open]:rounded-b-none data-[state=open]:shadow-2xl
                      data-[state=open]:border-b data-[state=open]:border-[#7a5e46]/30
                    `}
                  >
                    <span className="pr-8 text-[#2d2d2f] group-hover:text-[#7a5e46]">
                      {faq.question}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="w-8 h-8 flex items-center justify-center shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-[#7a5e46]" />
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content forceMount>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      height: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                      opacity: { duration: 0.4, delay: 0.1 },
                    }}
                    className="overflow-hidden bg-white rounded-b-2xl shadow-inner"
                  >
                    <div className="px-8 py-7 text-lg text-[#2d2d2f]/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </section>
  );
}
