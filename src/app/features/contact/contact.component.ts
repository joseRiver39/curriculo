import { Component, inject, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../core/services/i18n.service';
import { ProtectedInfoComponent } from '../../shared/components/protected-info.component';
import { LucideAngularModule, Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Linkedin } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule, ProtectedInfoComponent],
  template: `
    <section id="contacto" class="section">
      <div class="section-header">
        <h2 class="section-title">{{ i18n.t('contact_title') }}</h2>
        <p class="section-subtitle mt-4 mx-auto max-w-2xl fade-up fade-up-delay-1">
          {{ i18n.t('contact_sub') }}
        </p>
      </div>

      <div class="contact-wrapper">
        <div class="contact-info fade-up fade-up-delay-1">
          <div class="contact-item">
            <div class="contact-icon">
              <lucide-icon [name]="Mail" class="w-5 h-5"></lucide-icon>
            </div>
            <app-protected-info [parts]="['joseantonioriveraurbi16', 'gmail.com']" type="email"></app-protected-info>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <lucide-icon [name]="Phone" class="w-5 h-5"></lucide-icon>
            </div>
            <app-protected-info [parts]="['+57', '313', '394', '5995']" type="phone"></app-protected-info>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <lucide-icon [name]="Linkedin" class="w-5 h-5"></lucide-icon>
            </div>
            <a href="https://www.linkedin.com/in/jose-antonio-rivera-urbina-85221a8a" target="_blank" class="hover:text-accent transition-colors">
              {{ i18n.t('contact_linkedin') }}
            </a>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <lucide-icon [name]="MapPin" class="w-5 h-5"></lucide-icon>
            </div>
            <span>{{ i18n.t('contact_location') }}</span>
          </div>

          <div class="mt-8">
            <a href="https://wa.me/573133945995" target="_blank" class="btn-outline w-full justify-center">
              <lucide-icon [name]="MessageSquare" class="w-4 h-4"></lucide-icon>
              {{ i18n.t('contact_whatsapp') }}
            </a>
          </div>
        </div>

        <div class="fade-up fade-up-delay-2">
          <form *ngIf="!isSent()" [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
            <input type="text" formControlName="name" [placeholder]="i18n.t('contact_name')" 
                   class="form-input" [class.border-red-500]="isFieldInvalid('name')">
            
            <input type="email" formControlName="email" [placeholder]="i18n.t('contact_email')" 
                   class="form-input" [class.border-red-500]="isFieldInvalid('email')">
            
            <textarea formControlName="message" [placeholder]="i18n.t('contact_message')" 
                      rows="5" class="form-input" [class.border-red-500]="isFieldInvalid('message')"></textarea>
            
            <button type="submit" [disabled]="isSending() || contactForm.invalid" class="btn-primary w-full justify-center disabled:opacity-50">
              <lucide-icon *ngIf="!isSending()" [name]="Send" class="w-4 h-4"></lucide-icon>
              <span *ngIf="isSending()" class="animate-spin mr-2">◌</span>
              {{ isSending() ? i18n.t('projects_loading') : i18n.t('contact_send') }}
            </button>
            
            <p *ngIf="errorMessage()" class="text-red-500 text-sm mt-2">{{ errorMessage() }}</p>
          </form>

          <div *ngIf="isSent()" class="card bg-emerald-500/10 border-emerald-500/20 text-center p-8 flex flex-col items-center gap-4">
            <lucide-icon [name]="CheckCircle" class="w-12 h-12 text-emerald-500"></lucide-icon>
            <h3 class="text-xl font-bold">{{ i18n.lang() === 'es' ? '¡Mensaje enviado!' : 'Message sent!' }}</h3>
            <p class="text-secondary">{{ i18n.lang() === 'es' ? 'Gracias por contactarme. Te responderé pronto.' : 'Thanks for reaching out. I will get back to you soon.' }}</p>
            <button (click)="resetForm()" class="btn-outline mt-2">
              {{ i18n.lang() === 'es' ? 'Enviar otro mensaje' : 'Send another message' }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent implements AfterViewInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Linkedin = Linkedin;
  readonly Send = Send;
  readonly MessageSquare = MessageSquare;
  readonly CheckCircle = CheckCircle;

  contactForm: FormGroup;
  isSending = signal(false);
  isSent = signal(false);
  errorMessage = signal<string | null>(null);

  // ID DE FORMSPREE REAL
  private formspreeId = 'mbdwzzgq'; 

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initFadeUp(), 100);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSending.set(true);
      this.errorMessage.set(null);

      const url = `https://formspree.io/f/${this.formspreeId}`;
      
      this.http.post(url, this.contactForm.value).subscribe({
        next: (response) => {
          this.isSending.set(false);
          this.isSent.set(true);
          console.log('Success!', response);
        },
        error: (err) => {
          this.isSending.set(false);
          this.errorMessage.set('Error al enviar. Por favor, intenta de nuevo o usa WhatsApp.');
          console.error('Error!', err);
        }
      });
    }
  }

  resetForm() {
    this.isSent.set(false);
    this.contactForm.reset();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
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
