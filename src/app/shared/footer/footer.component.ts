import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container mx-auto">
        <p class="mb-2">
          {{ i18n.t('footer_made') }} <strong>JOSE RIVERA</strong>
        </p>
        <p class="text-xs opacity-60">
          © {{ currentYear }} · {{ i18n.t('footer_rights') }}
        </p>
      </div>
    </footer>
  `
})
export class FooterComponent {
  i18n = inject(I18nService);
  currentYear = new Date().getFullYear();
}
