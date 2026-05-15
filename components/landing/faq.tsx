"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { content } from "@/lib/content/he";

export function FAQ() {
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="border-t border-border bg-surface/30">
      <Container>
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.title}
          description={faq.description}
        />

        <ul className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface-elevated/50">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <li key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-start transition-colors hover:bg-surface-elevated sm:px-6 sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="pe-2 text-base font-medium text-foreground sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-sm text-muted transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-hebrew-body px-5 pb-5 text-sm text-muted sm:px-6 sm:pb-6 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
