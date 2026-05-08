import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Signal,
  ViewChild,
  AfterViewInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../core/pipes/safe-url.pipe';

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  description: string;
  stack: string[];
  category: string;
  accentColor: string;
  fallbackGradient: string;
}

@Component({
  selector: 'app-project-browser',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  template: `
    <div class="projects-grid">
      @for (project of projects; track project.id; let i = $index) {
        <div 
          class="project-card" 
          [class.visible]="isCardVisible(project.id)"
          [style.--accent-color]="project.accentColor"
          [style.--fallback-gradient]="project.fallbackGradient">
          
          <!-- Chrome Bar -->
          <div class="chrome-bar">
            <div class="window-controls">
              <span class="control red"></span>
              <span class="control yellow"></span>
              <span class="control green"></span>
            </div>
            <div class="url-bar">
              <span class="lock">🔒</span>
              <input 
                type="text" 
                [value]="project.url" 
                readonly 
                class="url-input" />
              <button 
                class="external-btn" 
                (click)="openProject(project.url)"
                title="Abrir en nueva pestaña">
                ↗
              </button>
            </div>
          </div>

          <!-- Loading Progress -->
          <div class="loading-bar">
            <div class="progress" [class.loaded]="loadedStates.has(project.id)"></div>
          </div>

          <!-- Iframe Container -->
          <div class="iframe-wrapper" (click)="openProject(project.url)">
            @if (!isIframeError(project.id)) {
              <iframe
                [src]="project.url | safeUrl"
                class="preview-iframe"
                width="100%"
                height="320"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                (error)="onIframeError(project.id)"
                (load)="onIframeLoad(project.id)">
              </iframe>
            } @else {
              <!-- Fallback Placeholder -->
              <div class="fallback" [style.background]="'linear-gradient(135deg, var(--accent-color) 0%, ' + project.accentColor + '99)'">
                <div class="fallback-pattern"></div>
                <div class="fallback-content">
                  <h3 class="fallback-title">{{ project.title }}</h3>
                  <p class="fallback-subtitle">{{ project.subtitle }}</p>
                  <div class="stack-badges">
                    @for (tech of project.stack; track tech) {
                      <span class="badge">{{ tech }}</span>
                    }
                  </div>
                </div>
              </div>
            }
            
            <!-- Hover Overlay -->
            <div class="hover-overlay">
              <span>Ver proyecto completo ↗</span>
            </div>
          </div>

          <!-- Project Info -->
          <div class="project-info">
            <div class="info-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <span class="category">{{ project.category }}</span>
            </div>
            <p class="description">{{ project.description }}</p>
            <div class="tags">
              @for (tech of project.stack; track tech) {
                <span class="tag">{{ tech }}</span>
              }
            </div>
            <a [href]="project.url" target="_blank" class="view-btn">
              Ver →
            </a>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    @media (max-width: 1024px) {
      .projects-grid {
        grid-template-columns: 1fr;
        max-width: 600px;
      }
    }

    .project-card {
      background: #1a1a2e;
      border-radius: 16px;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      max-width: 600px;
      height: 520px;
    }

    .project-card.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .chrome-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      background: rgba(30, 30, 50, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .window-controls {
      display: flex;
      gap: 8px;
      padding-right: 12px;
    }

    .control {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .control.red { background: #ff5f57; }
    .control.yellow { background: #febc2e; }
    .control.green { background: #28c840; }

    .url-bar {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 4px 10px;
    }

    .lock {
      font-size: 12px;
      opacity: 0.6;
    }

    .url-input {
      flex: 1;
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 11px;
      outline: none;
    }

    .external-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: rgba(255, 255, 255, 0.7);
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .external-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .loading-bar {
      height: 3px;
      background: rgba(255, 255, 255, 0.05);
      overflow: hidden;
    }

    .progress {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, transparent, var(--accent-color, #4f8cff), var(--accent-color, #4f8cff));
      transition: width 0.3s ease;
    }

    .progress.loaded {
      width: 100%;
      opacity: 0;
      transition: opacity 0.5s ease 0.3s, width 0.3s ease;
    }

    .iframe-wrapper {
      position: relative;
      height: 320px;
      overflow: hidden;
      background: #0f0f1a;
      cursor: pointer;
    }

    .preview-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 133%;
      height: 427px;
      border: none;
      transform: scale(0.75);
      transform-origin: top left;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .preview-iframe:not([loading]) {
      opacity: 1;
    }

    .fallback {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .fallback-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 20px 20px;
      animation: pattern-move 20s linear infinite;
    }

    @keyframes pattern-move {
      0% { transform: translate(0, 0); }
      100% { transform: translate(20px, 20px); }
    }

    .fallback-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 2rem;
    }

    .fallback-title {
      font-size: 28px;
      font-weight: 700;
      color: white;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }

    .fallback-subtitle {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 16px 0;
    }

    .stack-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }

    .badge {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }

    .hover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .iframe-wrapper:hover .hover-overlay {
      opacity: 1;
      visibility: visible;
    }

    .hover-overlay span {
      color: white;
      font-size: 16px;
      font-weight: 500;
      background: var(--accent-color, #4f8cff);
      padding: 12px 24px;
      border-radius: 8px;
    }

    .project-info {
      padding: 16px;
      background: linear-gradient(180deg, rgba(26, 26, 46, 0) 0%, #1a1a2e 100%);
    }

    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .project-title {
      font-size: 18px;
      font-weight: 600;
      color: white;
      margin: 0;
    }

    .category {
      font-size: 11px;
      color: var(--accent-color, #4f8cff);
      background: rgba(79, 140, 255, 0.15);
      padding: 4px 8px;
      border-radius: 4px;
    }

    .description {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      margin: 0 0 12px 0;
      line-height: 1.5;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }

    .tag {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
      background: rgba(255, 255, 255, 0.08);
      padding: 4px 8px;
      border-radius: 4px;
    }

    .view-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--accent-color, #4f8cff);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: gap 0.2s ease;
    }

    .view-btn:hover {
      gap: 10px;
    }
  `],
})
export class ProjectBrowserComponent implements AfterViewInit {
  @ViewChild('projectCards', { read: ElementRef }) projectCards?: ElementRef;

  visibleCards = signal<Set<number>>(new Set());
  loadedStates = signal<Set<number>>(new Set());
  iframeErrors = signal<Set<number>>(new Set());

  // Helper methods for template
  isCardVisible(id: number): boolean {
    return this.visibleCards().has(id);
  }

  isCardLoaded(id: number): boolean {
    return this.loadedStates().has(id);
  }

  isIframeError(id: number): boolean {
    return this.iframeErrors().has(id);
  }

  projects: Project[] = [
    {
      id: 1,
      title: 'Mykenjos Jeans',
      subtitle: 'E-Commerce Premium',
      url: 'https://mykenjosjeans.vercel.app/',
      description:
        'Plataforma e-commerce de mezclilla colombiana con panel admin, inventario, carrito persistente y checkout multi-paso.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS', 'Recharts'],
      category: 'E-Commerce · Full Stack',
      accentColor: '#4f8cff',
      fallbackGradient: 'from-blue-900 to-blue-600',
    },
    {
      id: 2,
      title: 'AGROsilice · RiSil',
      subtitle: 'Landing Científica',
      url: 'https://agrosilice-landing.vercel.app/',
      description:
        'Plataforma sobre valorización del tamo de arroz con calculadora científica y API TRM del gobierno colombiano.',
      stack: ['Angular 19', 'TailwindCSS', 'Canvas API', 'Datos Abiertos CO'],
      category: 'Angular · Landing Page',
      accentColor: '#34d399',
      fallbackGradient: 'from-emerald-900 to-emerald-600',
    },
    {
      id: 3,
      title: 'Cuadernillo Digital',
      subtitle: 'App Educativa Interactiva',
      url: 'https://cuadernillo-tecnologia.vercel.app/',
      description:
        'Guía interactiva sobre uso responsable de tecnología para familias. UI premium con modo oscuro y animaciones.',
      stack: ['React 18', 'Vite', 'TailwindCSS', 'Framer Motion'],
      category: 'React · Educación',
      accentColor: '#a78bfa',
      fallbackGradient: 'from-purple-900 to-purple-600',
    },
    {
      id: 4,
      title: 'Landing Page Template',
      subtitle: 'Template UI/UX Premium',
      url: 'https://landing-page-platilla.vercel.app/',
      description:
        'Template de landing page moderna y reutilizable con estándares premium de UI/UX, fully responsive.',
      stack: ['Next.js', 'React', 'TailwindCSS'],
      category: 'Template · UI/UX',
      accentColor: '#fb923c',
      fallbackGradient: 'from-orange-900 to-orange-600',
    },
  ];

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const projectId = parseInt(card.dataset['projectId'] || '0', 10);
            if (projectId) {
              setTimeout(() => {
                this.visibleCards.update((set) => {
                  const newSet = new Set(set);
                  newSet.add(projectId);
                  return newSet;
                });
              }, projectId * 150);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all project cards after a short delay
    setTimeout(() => {
      document.querySelectorAll('.project-card').forEach((card, index) => {
        card.setAttribute('data-project-id', String(index + 1));
        observer.observe(card);
      });
    }, 100);
  }

  onIframeLoad(projectId: number): void {
    this.loadedStates.update((set) => {
      const newSet = new Set(set);
      newSet.add(projectId);
      return newSet;
    });
  }

  onIframeError(projectId: number): void {
    this.iframeErrors.update((set) => {
      const newSet = new Set(set);
      newSet.add(projectId);
      return newSet;
    });
  }

  openProject(url: string): void {
    window.open(url, '_blank');
  }
}