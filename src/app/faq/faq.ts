import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
})
export class Faq {
  faqs = signal<FaqItem[]>([
    {
      question: "What's the best thing about Switzerland?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      isOpen: true,
    },
    {
      question: 'How do you make holy water?',
      answer:
        'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
      isOpen: false,
    },
    {
      question: 'What do you call someone with no body and no nose?',
      answer:
        'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
      isOpen: false,
    },
    {
      question: 'Why do you never see elephants hiding in trees?',
      answer:
        "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      isOpen: false,
    },
    {
      question: "Why can't you hear a pterodactyl go to the bathroom?",
      answer:
        'Because the pee is silent. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
      isOpen: false,
    },
    {
      question: 'Why did the invisible man turn down the job offer?',
      answer:
        "He couldn't see himself doing it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      isOpen: false,
    },
  ]);

  toggle(index: number) {
    this.faqs.update((items) =>
      items.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  }
}
