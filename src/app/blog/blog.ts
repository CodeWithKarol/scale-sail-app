import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Post, PostCard } from './post-card/post-card';

interface RssItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: any;
  categories: string[];
}

interface RssFeed {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}

interface RssResponse {
  status: string;
  feed: RssFeed;
  items: RssItem[];
}

@Component({
  selector: 'app-blog',
  imports: [CommonModule, PostCard],
  templateUrl: './blog.html',
})
export class Blog {
  private readonly rssUrl = 'https://karol-modelski.medium.com/feed';
  private readonly apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${this.rssUrl}`;

  blogResource = httpResource<RssResponse>(() => this.apiUrl);

  posts = computed<Post[]>(() => {
    const response = this.blogResource.value();
    if (response?.status !== 'ok') {
      return [];
    }

    return response.items.map((item) => ({
      id: item.guid,
      title: item.title,
      href: item.link,
      description: this.stripHtml(item.description),
      date: new Date(item.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      datetime: item.pubDate,
      category: {
        title: item.categories.length > 0 ? item.categories[0] : 'General',
        href: '#',
      },
      author: {
        name: item.author,
        role: 'Author',
        href: '#',
        imageUrl: response.feed.image || '',
      },
      imageUrl: item.thumbnail || this.extractImage(item.description),
    }));
  });

  private stripHtml(html: string): string {
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]*>?/gm, '');
    }
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  private extractImage(content: string): string {
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : '';
  }
}
