import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleManagerService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setStyle(stylePath: string): void {
    // Check if we're in a browser environment before modifying the DOM
    if (isPlatformBrowser(this.platformId)) {
      let linkElement = this.document.getElementById('app-theme') as HTMLLinkElement;
      
      if (linkElement) {
        // If the link element already exists, update the href attribute
        linkElement.href = stylePath;
      } else {
        // Otherwise, create the link element and append it to the head
        linkElement = this.document.createElement('link');
        linkElement.id = 'app-theme';
        linkElement.rel = 'stylesheet';
        linkElement.href = stylePath;
        this.document.head.appendChild(linkElement);
      }
    }
  }
}
