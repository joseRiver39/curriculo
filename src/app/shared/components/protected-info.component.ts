import { Component, Input, AfterViewInit, ViewChild, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protected-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #infoCanvas class="block cursor-pointer transition-opacity hover:opacity-80" 
            [title]="type === 'email' ? 'Enviar email' : 'Llamar'"></canvas>
  `
})
export class ProtectedInfoComponent implements AfterViewInit {
  @Input({ required: true }) parts: string[] = [];
  @Input({ required: true }) type: 'email' | 'phone' = 'email';
  @Input() fontSize = '16px';
  @Input() colorLight = '#444466';
  @Input() colorDark = '#9999bb';

  @ViewChild('infoCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.draw();
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const text = this.type === 'email' ? `${this.parts[0]}@${this.parts[1]}` : this.parts.join(' ');
    
    ctx.font = `${this.fontSize} "DM Sans", sans-serif`;
    const metrics = ctx.measureText(text);
    
    // Ajustar tamaño del canvas al texto
    canvas.width = metrics.width;
    canvas.height = parseInt(this.fontSize) * 1.5;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? this.colorDark : this.colorLight;
    ctx.font = `${this.fontSize} "DM Sans", sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, canvas.height / 2);
  }

  @HostListener('click')
  onClick() {
    const text = this.type === 'email' ? `${this.parts[0]}@${this.parts[1]}` : this.parts.join('');
    const prefix = this.type === 'email' ? 'mailto:' : 'tel:';
    window.location.href = `${prefix}${text.replace(/\s/g, '')}`;
  }

  // Redibujar si cambia el tema
  @HostListener('window:storage')
  @HostListener('window:click') // Simplificación para detectar cambios de tema por clic en botones
  refresh() {
    setTimeout(() => this.draw(), 50);
  }
}
