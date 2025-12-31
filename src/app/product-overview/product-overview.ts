import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { SafeHtmlDirective } from '../shared/directives/safe-html.directive';
import { ProductGalleryComponent } from '../products/product-gallery/product-gallery';
import { ProductTabsComponent } from '../products/product-tabs/product-tabs';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner';

interface GumroadProduct {
  id: string;
  name: string;
  preview_url: string;
  description: string;
  formatted_price: string;
  short_url: string;
  thumbnail_url: string;
  tags: string[];
  price: number;
  currency: string;
  published: boolean;
  sales_count: number;
  sales_usd_cents: number;
  customizable_price: boolean;
  require_shipping: boolean;
  custom_receipt: string | null;
  custom_permalink: string | null;
  subscription_duration: string | null;
  url: string | null;
  file_info: { [key: string]: string };
  max_purchase_count: number | null;
  deleted: boolean;
  custom_fields: any[];
  custom_summary: string;
  is_tiered_membership: boolean;
  recurrences: any | null;
  variants: any[];
  custom_delivery_url: string | null;
}

interface GumroadProductResponse {
  success: boolean;
  product: GumroadProduct;
}

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    CommonModule,
    SafeHtmlDirective,
    ProductGalleryComponent,
    ProductTabsComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './product-overview.html',
})
export class ProductOverview {
  private readonly route = inject(ActivatedRoute);

  getProductImages(product: GumroadProduct): string[] {
    const images = [product.preview_url];
    if (product.thumbnail_url && product.thumbnail_url !== product.preview_url) {
      images.push(product.thumbnail_url);
    }
    // Fill with duplicates if less than 4 to match the design request
    while (images.length < 4) {
      images.push(product.preview_url);
    }
    return images;
  }
  private readonly accessToken = 'VIK5oqu0ZuxUBaFDYXKBhlnmtMol7eF0XJNVTQy8LSU';

  id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))));

  productResource = httpResource<GumroadProductResponse>(() => {
    const id = this.id();
    if (!id) return undefined;
    return `https://api.gumroad.com/v2/products/${id}?access_token=${this.accessToken}`;
  });

  product = computed(() => {
    const response = this.productResource.value();
    if (!response?.success) {
      return null;
    }
    const p = response.product;

    let description = p.description;
    let previewUrl = '';
    // Extract preview URL from the description if available
    const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>.*?Live Demo.*?<\/a>/;
    const match = description.match(linkRegex);
    if (match) {
      previewUrl = match[1];
      description = description.replace(match[0], '');
    }

    // Remove images from description
    description = description.replace(/<img[^>]*>/g, '');

    // --- FAQ Extraction Start ---
    let extractedFaqs: { question: string; answer: string }[] = [];

    // Find "Frequently Asked Questions" or "FAQ" inside a header tag or bold tag
    // We iterate through all potential headers to find the best match, avoiding casual mentions.
    const potentialHeadersRegex = /<(h[1-6]|strong|b|p)[^>]*>([\s\S]*?)<\/\1>/gi;
    const matches = [...description.matchAll(potentialHeadersRegex)];

    // Filter matches to find those that are *strictly* FAQ headers
    const validMatches = matches.filter((m) => {
      const content = m[2].replace(/<[^>]*>/g, ''); // Strip HTML tags inside
      // Remove emojis, punctuation, and special chars, keep letters and spaces
      const cleanContent = content.replace(/[^\w\s]/g, '').trim();

      // Check if the line starts with FAQ keywords (ignoring case)
      // We allow trailing text (e.g. "FAQ - Quick Answers") but ensure it starts with the keyword
      return /^(frequently\s*asked\s*questions|faq|f\s*a\s*q|questions)(\s|$)/i.test(cleanContent);
    });

    if (validMatches.length > 0) {
      // Prioritize actual heading tags (h1-h6) over strong/b/p
      let faqHeaderMatch = validMatches.find((m) => /^h[1-6]$/i.test(m[1]));
      if (!faqHeaderMatch) {
        faqHeaderMatch = validMatches[0];
      }

      // Get content after the header
      const headerIndex = faqHeaderMatch.index!;
      const headerLength = faqHeaderMatch[0].length;
      const contentAfterHeader = description.slice(headerIndex + headerLength);

      // Stop at the next heading to avoid grabbing other sections
      const nextHeaderMatch = contentAfterHeader.match(/<h[1-6][^>]*>/i);
      const sectionLength = nextHeaderMatch ? nextHeaderMatch.index! : contentAfterHeader.length;
      const faqSection = contentAfterHeader.slice(0, sectionLength);

      // Parse the section into blocks (li, p, div) to handle various structures
      const tagMatches = [...faqSection.matchAll(/<(li|p|div)[^>]*>([\s\S]*?)<\/\1>/gi)];

      let currentQuestion: string | null = null;
      let currentAnswer: string[] = [];

      const pushFaq = () => {
        if (currentQuestion) {
          extractedFaqs.push({
            question: currentQuestion,
            answer: currentAnswer.join(' ').trim(),
          });
        }
        currentQuestion = null;
        currentAnswer = [];
      };

      for (const match of tagMatches) {
        const tag = match[1].toLowerCase();
        const text = match[2].trim();
        if (!text) continue;

        // Heuristics to identify a new question
        const hasBold = /<(strong|b)[^>]*>/i.test(text);
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        const endsWithQuestionMark = cleanText.endsWith('?');
        const isLi = tag === 'li';

        // If it's an LI, or has bold text, or ends with ?, it's likely a question start
        if (isLi || hasBold || (endsWithQuestionMark && !currentQuestion)) {
          pushFaq();

          // Try to extract Question vs Answer from within the block
          const boldMatch = text.match(/<(strong|b)[^>]*>(.*?)<\/\1>/i);

          if (boldMatch) {
            // Case: Bold text is the question
            currentQuestion = boldMatch[2].replace(/<[^>]*>/g, '').trim();
            const rest = text.replace(boldMatch[0], '').trim();
            if (rest) currentAnswer.push(rest.replace(/<[^>]*>/g, '').trim());
          } else if (text.includes('?')) {
            // Case: Split by '?'
            const parts = text.split('?');
            // Re-add ? to the question part
            currentQuestion = parts[0].replace(/<[^>]*>/g, '').trim() + '?';
            const rest = parts.slice(1).join('?').trim();
            if (rest) currentAnswer.push(rest.replace(/<[^>]*>/g, '').trim());
          } else {
            // Case: Whole block is the question
            currentQuestion = cleanText;
          }
        } else {
          // It's likely an answer paragraph
          if (currentQuestion) {
            currentAnswer.push(cleanText);
          }
        }
      }
      pushFaq();

      // Remove the FAQ section from the description
      // We remove from the start of the header to the end of the section
      const partToRemove = description.slice(
        headerIndex,
        headerIndex + headerLength + sectionLength
      );
      description = description.replace(partToRemove, '');
    }
    // --- FAQ Extraction End ---

    return {
      name: p.name,
      version: '1.0', // Mock
      updated: 'Recently', // Mock
      rating: 5, // Mock
      description: description,
      price: p.formatted_price,
      highlights: p.tags.length > 0 ? p.tags : ['High quality', 'Instant download'],
      license: 'Standard License', // Mock
      licenseLink: '#', // Mock
      imageSrc: p.preview_url,
      images: this.getProductImages(p),
      href: p.short_url,
      previewUrl,
      extractedFaqs: extractedFaqs.filter((f) => f.question && f.answer),
    };
  });

  reviews = [
    {
      id: 1,
      rating: 5,
      content: `This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!`,
      date: 'July 16, 2021',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.`,
      date: 'July 12, 2021',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      rating: 4,
      content: `I really like the style of these icons, but I wish there were more categories. I'm building a healthcare app and there are only a few icons that are relevant to my industry.`,
      date: 'July 10, 2021',
      author: 'Mark Edwards',
      avatarSrc:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  faqs = computed(() => this.product()?.extractedFaqs || []);

  license = {
    summary:
      'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
    content: `
      <h4>Overview</h4>
      <p>You're allowed to use the icons in unlimited projects.</p>
      
      <h4>Rights</h4>
      <p>You have rights for royalty free use of our resources for any or all of your personal and commercial projects.</p>
      <p>You may modify the resources according to your requirements and use them royalty free in any or all of your personal and commercial projects. For example, you may include this resource in a website you will be designing for a client.</p>
      
      <h4>Prohibitions</h4>
      <p>You do not have the rights to redistribute, resell, lease, license, sub-license or offer the file downloaded to any third party.</p>
      <p>For any resalable web applications or software programs, you should not include our graphic resources as an additional attachment. This will be considered as a redistribution of our resources.</p>
    `,
  };
}
