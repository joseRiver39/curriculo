import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="habilidades" class="section">
      <div class="section-header">
        <h2 class="section-title">{{ i18n.t('skills_title') }}</h2>
      </div>

      <div class="skills-grid">
        <div class="card fade-up fade-up-delay-1">
          <h3 class="skill-category-title">{{ i18n.t('skills_backend') }}</h3>
          <div class="skill-tags">
            <span class="badge">Java</span>
            <span class="badge">Spring Boot</span>
            <span class="badge">Spring Security</span>
            <span class="badge">C# / .NET</span>
            <span class="badge">Node.js</span>
            <span class="badge">Python</span>
          </div>
        </div>

        <div class="card fade-up fade-up-delay-2">
          <h3 class="skill-category-title">{{ i18n.t('skills_frontend') }}</h3>
          <div class="skill-tags">
            <span class="badge">Angular</span>
            <span class="badge">React</span>
            <span class="badge">TypeScript</span>
            <span class="badge">TailwindCSS</span>
            <span class="badge">Next.js</span>
          </div>
        </div>

        <div class="card fade-up fade-up-delay-3">
          <h3 class="skill-category-title">{{ i18n.t('skills_databases') }}</h3>
          <div class="skill-tags">
            <span class="badge">MySQL</span>
            <span class="badge">PostgreSQL</span>
            <span class="badge">MongoDB</span>
            <span class="badge">Redis</span>
            <span class="badge">SQL Server</span>
          </div>
        </div>

        <div class="card fade-up fade-up-delay-4">
          <h3 class="skill-category-title">{{ i18n.t('skills_tools') }}</h3>
          <div class="skill-tags">
            <span class="badge">Docker</span>
            <span class="badge">Git</span>
            <span class="badge">Jenkins</span>
            <span class="badge">AWS</span>
            <span class="badge">Azure</span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent implements AfterViewInit {
  i18n = inject(I18nService);

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
}
