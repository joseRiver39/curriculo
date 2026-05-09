import { Component, inject, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { SafeUrlPipe } from '../../core/pipes/safe-url.pipe';
import { LucideAngularModule, ExternalLink, Globe, Monitor } from 'lucide-angular';

interface Project {
  id: number;
  title: string;
  url: string;
  descriptionKey: string;
  stack: string[];
  category: string;
  accentColor: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, LucideAngularModule],
  template: `
    <section id="proyectos" class="section">
      <div class="section-header">
        <h2 class="section-title">{{ i18n.t('projects_title') }}</h2>
      </div>

      <div class="projects-grid">
        @for (project of projects; track project.id; let i = $index) {
          <div class="project-card fade-up" [ngClass]="'fade-up-delay-' + (i + 1)">
            <div class="browser-chrome">
              <div class="browser-dots">
                <span class="browser-dot bg-[#ff5f57]"></span>
                <span class="browser-dot bg-[#febc2e]"></span>
                <span class="browser-dot bg-[#28c840]"></span>
              </div>
              <div class="browser-url">
                <lucide-icon [name]="Globe" class="w-3 h-3"></lucide-icon>
                <span>{{ project.url }}</span>
              </div>
              <button class="browser-open-btn" (click)="openProject(project.url)">
                <lucide-icon [name]="ExternalLink" class="w-3 h-3"></lucide-icon>
                {{ i18n.t('projects_view') }}
              </button>
            </div>

            <div class="browser-loading-bar" *ngIf="!loadedStates().has(project.id)"></div>

            <div class="browser-viewport" (click)="openProject(project.url)">
              @if (!iframeErrors().has(project.id)) {
                <iframe
                  [src]="project.url | safeUrl"
                  (load)="onIframeLoad(project.id)"
                  (error)="onIframeError(project.id)"
                  loading="lazy">
                </iframe>
              } @else {
                <div class="browser-fallback" [style.background]="project.accentColor + '22'">
                  <lucide-icon [name]="Monitor" class="w-12 h-12" [style.color]="project.accentColor"></lucide-icon>
                  <p class="text-sm font-medium">{{ i18n.t('projects_loading') }}</p>
                </div>
              }
              <div class="browser-overlay">
                <span>{{ i18n.t('projects_open') }} ↗</span>
              </div>
            </div>

            <div class="project-info">
              <div class="project-category" [style.color]="project.accentColor">{{ project.category }}</div>
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-desc">{{ i18n.t(project.descriptionKey) }}</p>
              <div class="project-stack">
                @for (tech of project.stack; track tech) {
                  <span class="badge">{{ tech }}</span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsComponent implements AfterViewInit {
  i18n = inject(I18nService);
  
  readonly Globe = Globe;
  readonly ExternalLink = ExternalLink;
  readonly Monitor = Monitor;

  loadedStates = signal<Set<number>>(new Set());
  iframeErrors = signal<Set<number>>(new Set());

  projects: Project[] = [
    {
      id: 1,
      title: 'Mykenjos Jeans',
      url: 'https://mykenjosjeans.vercel.app/',
      descriptionKey: 'proj1_desc',
      stack: ['Next.js', 'React', 'TailwindCSS'],
      category: 'E-Commerce',
      accentColor: '#4f8cff'
    },
    {
      id: 2,
      title: 'AGROsilice',
      url: 'https://agrosilice-landing.vercel.app/',
      descriptionKey: 'proj2_desc',
      stack: ['Angular', 'TailwindCSS', 'Canvas API'],
      category: 'Science & Bio',
      accentColor: '#34d399'
    },
    {
      id: 3,
      title: 'Cuadernillo Digital',
      url: 'https://cuadernillo-tecnologia.vercel.app/',
      descriptionKey: 'proj3_desc',
      stack: ['React', 'Vite', 'Framer Motion'],
      category: 'Education',
      accentColor: '#a78bfa'
    },
    {
      id: 4,
      title: 'Landing Template',
      url: 'https://landing-page-platilla.vercel.app/',
      descriptionKey: 'proj4_desc',
      stack: ['Next.js', 'React', 'Premium UI'],
      category: 'Design System',
      accentColor: '#fb923c'
    }
  ];

  ngAfterViewInit() {
    setTimeout(() => this.initFadeUp(), 100);
  }

  private initFadeUp() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }

  onIframeLoad(id: number) {
    this.loadedStates.update(s => new Set(s).add(id));
  }

  onIframeError(id: number) {
    this.iframeErrors.update(s => new Set(s).add(id));
  }

  openProject(url: string) {
    window.open(url, '_blank');
  }
}
