import { Component, inject, AfterViewInit, ElementRef, ViewChild, OnDestroy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { LucideAngularModule, ExternalLink, Download } from 'lucide-angular';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section class="hero-section">
      <canvas #heroCanvas id="hero-canvas"></canvas>
      
      <div class="hero-content">
        <span class="hero-greeting fade-up">{{ i18n.t('hero_greeting') }}</span>
        <h1 class="hero-name fade-up fade-up-delay-1">JOSÉ RIVERA</h1>
        
        <div class="hero-role fade-up fade-up-delay-2" translate="no">
          <span>{{ currentRoleText() }}</span><span class="animate-pulse">|</span>
        </div>
        
        <p class="hero-sub fade-up fade-up-delay-3">
          {{ i18n.t('hero_sub') }}
        </p>

        <div class="hero-tags fade-up fade-up-delay-3">
          <span class="badge">Java · Spring Boot</span>
          <span class="badge">C# · .NET</span>
          <span class="badge">Angular · React</span>
          <span class="badge">AI Integration</span>
        </div>

        <div class="hero-actions fade-up fade-up-delay-4">
          <a href="#proyectos" class="btn-primary">
            <lucide-icon [name]="ExternalLink" class="w-4 h-4"></lucide-icon>
            {{ i18n.t('hero_cta_projects') }}
          </a>
          <a [href]="i18n.t('hero_cv_path')" class="btn-outline">
            <lucide-icon [name]="Download" class="w-4 h-4"></lucide-icon>
            {{ i18n.t('hero_cta_cv') }}
          </a>
        </div>

        <div class="hero-available fade-up fade-up-delay-4">
          {{ i18n.t('hero_available') }}
        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  i18n = inject(I18nService);
  
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  readonly ExternalLink = ExternalLink;
  readonly Download = Download;

  currentRoleText = signal('');
  
  // Roles traducidos dinámicamente
  roles = computed(() => [
    this.i18n.t('hero_role'),
    this.i18n.t('hero_role_1'),
    this.i18n.t('hero_role_2'),
    this.i18n.t('hero_role_3')
  ]);

  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typewriterTimeout: any;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId!: number;

  constructor() {
    // Reiniciar typewriter si cambia el idioma
    effect(() => {
      this.i18n.lang(); // Subscribirse al cambio
      this.resetTypewriter();
    });
  }

  ngAfterViewInit() {
    this.initCanvas();
    this.animateParticles();
    this.typewriter();
    setTimeout(() => this.initFadeUp(), 100);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.typewriterTimeout);
  }

  private resetTypewriter() {
    clearTimeout(this.typewriterTimeout);
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typewriter();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private animateParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4f8cff';
    this.ctx.fillStyle = accentColor;
    this.ctx.strokeStyle = accentColor;
    this.ctx.globalAlpha = 0.3;

    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          this.ctx.globalAlpha = (1 - dist / 120) * 0.2;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
      this.ctx.globalAlpha = 0.3;
    });

    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }

  private typewriter() {
    clearTimeout(this.typewriterTimeout); // EVITAR EJECUCIONES DUPLICADAS
    
    const currentRoles = this.roles();
    const currentRole = currentRoles[this.roleIndex];
    
    if (this.isDeleting) {
      this.currentRoleText.set(currentRole.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentRoleText.set(currentRole.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let speed = this.isDeleting ? 100 : 200; // Mucho más lento (Escritura: 200ms, Borrado: 100ms)

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      this.isDeleting = true;
      this.typewriterTimeout = setTimeout(() => this.typewriter(), 3000); // PAUSA DE 3 SEGUNDOS
      return; 
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % currentRoles.length;
      speed = 1500;
    }

    this.typewriterTimeout = setTimeout(() => this.typewriter(), speed);
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
