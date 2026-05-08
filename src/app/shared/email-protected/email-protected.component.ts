import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-email-protected',
  standalone: true,
  template: `
    <div class="email-protected-container" (contextmenu)="onContextMenu($event)">
      <!-- Honeypot email (hidden) -->
      <a class="honeypot" href="mailto:contact@noreply-donotuse.invalid">
        contact&#64;noreply-donotuse.invalid
      </a>
      
      <!-- Canvas for email rendering -->
      <canvas 
        #emailCanvas 
        class="email-canvas"
        (click)="openContact()"
        (selectstart)="onSelectStart($event)">
      </canvas>
      
      <!-- Tooltip -->
      <div #tooltip class="tooltip" [class.visible]="showTooltip">
        Usa el botón de contacto 😊
      </div>
      
      <!-- Action button -->
      <button class="contact-btn" (click)="openContact(); $event.stopPropagation()">
        Enviar mensaje
      </button>
    </div>
  `,
  styles: [`
    .email-protected-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      position: relative;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .honeypot {
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .email-canvas {
      cursor: pointer;
      border-radius: 8px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      user-select: none;
      -webkit-user-select: none;
      pointer-events: auto;
    }

    .email-canvas:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .email-canvas:active {
      transform: translateY(0);
    }

    .tooltip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      z-index: 1000;
      white-space: nowrap;
      pointer-events: none;
    }

    .tooltip.visible {
      opacity: 1;
      visibility: visible;
      animation: tooltip-bounce 0.5s ease;
    }

    @keyframes tooltip-bounce {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.1); }
    }

    .contact-btn {
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
    }

    .contact-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
    }

    .contact-btn:active {
      transform: translateY(0);
    }
  `],
})
export class EmailProtectedComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emailCanvas') emailCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tooltip') tooltip!: ElementRef<HTMLDivElement>;

  showTooltip = false;
  private tooltipTimeout: any;
  private animationFrameId: number | null = null;

  // Email parts - split for runtime construction
  private emailParts = {
    user: 'joseantonioriveraurbi16',
    domain: 'gmail',
    tld: 'com',
  };

  // Phone parts - split for WhatsApp
  private phoneParts = {
    countryCode: '57',
    areaCode: '313',
    number: '3945995',
  };

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderEmailOnCanvas();
    this.setupCanvasEvents();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
  }

  /**
   * CAPA 1 & 2: Build email in runtime and render on Canvas
   * with irregular letter-spacing for OCR protection
   */
  private renderEmailOnCanvas(): void {
    const canvas = this.emailCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Build email at runtime
    const email = `${this.emailParts.user}@${this.emailParts.domain}.${this.emailParts.tld}`;

    // Canvas dimensions
    const fontSize = 18;
    const padding = 24;
    const charWidths: number[] = [];

    // Calculate irregular spacing for each character
    for (let i = 0; i < email.length; i++) {
      const baseSpacing = 1 + Math.random() * 2.5; // Random between 1 and 3.5
      const isSpecialChar = email[i] === '@' || email[i] === '.';
      charWidths.push(fontSize * 0.6 + (isSpecialChar ? 4 : baseSpacing));
    }

    const totalWidth = charWidths.reduce((a, b) => a + b, 0) + padding * 2;
    const totalHeight = fontSize * 2;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background styling
    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, 8);
    ctx.fill();

    // Email text with irregular spacing (kerning)
    let currentX = padding;
    const centerY = canvas.height / 2;

    for (let i = 0; i < email.length; i++) {
      const char = email[i];
      const spacing = charWidths[i];

      // Vary font size slightly for each char
      const variedSize = fontSize + (Math.random() * 2 - 1);
      
      ctx.font = `${variedSize}px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.fillStyle = '#2563eb';
      ctx.textBaseline = 'middle';
      
      // Draw character
      ctx.fillText(char, currentX, centerY);

      currentX += spacing;
    }
  }

  private setupCanvasEvents(): void {
    const canvas = this.emailCanvas.nativeElement;
    
    this.renderer.listen(canvas, 'mouseenter', () => {
      canvas.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });

    this.renderer.listen(canvas, 'mouseleave', () => {
      canvas.style.boxShadow = 'none';
    });
  }

  /**
   * CAPA 5: Build mailto link at runtime and execute
   */
  openContact(): void {
    // Build email at runtime
    const email = `${this.emailParts.user}@${this.emailParts.domain}.${this.emailParts.tld}`;
    const mailtoLink = `mailto:${email}?subject=Contacto desde web`;

    // Build WhatsApp URL at runtime
    const phone = `${this.phoneParts.countryCode}${this.phoneParts.areaCode}${this.phoneParts.number}`;
    const whatsappUrl = `https://wa.me/${phone}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Also allow mailto as fallback
    window.location.href = mailtoLink;
  }

  /**
   * CAPA 3: Prevent copy/select events
   */
  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent): boolean {
    this.showTooltipMessage();
    event.preventDefault();
    return false;
  }

  @HostListener('document:selectstart', ['$event'])
  onSelectStart(event: Event): boolean {
    this.showTooltipMessage();
    event.preventDefault();
    return false;
  }

  onContextMenu(event: MouseEvent): boolean {
    this.showTooltipMessage();
    event.preventDefault();
    return false;
  }

  private showTooltipMessage(): void {
    this.showTooltip = true;
    
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    this.tooltipTimeout = setTimeout(() => {
      this.showTooltip = false;
    }, 2000);
  }
}