import { Component, HostListener } from '@angular/core';

const FORM_ENDPOINT = 'https://formspree.io/f/xaqrdzwy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scrolled = false;
  mobileMenuOpen = false;
  currentYear = new Date().getFullYear();

  navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  services = [
    {
      title: 'Software Project Management',
      description: 'End-to-end project oversight, agile methodologies, and delivery excellence. We ensure your software projects are delivered on time, within budget, and to the highest quality standards.',
      icon: 'ri-list-check-2',
    },
    {
      title: 'Software Development',
      description: 'Custom web and mobile applications built with modern technologies. From concept to deployment, we craft scalable solutions tailored to your business needs.',
      icon: 'ri-code-s-slash-line',
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that combines aesthetics with functionality. We create intuitive interfaces that delight users and drive engagement for your digital products.',
      icon: 'ri-palette-line',
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by cutting-edge AI. From predictive analytics to natural language processing, we help you leverage data for smarter business decisions.',
      icon: 'ri-cpu-line',
    },
    {
      title: 'Consultancy',
      description: 'Strategic technology advisory to guide your digital transformation. We provide expert insights on architecture, technology stack selection, and innovation roadmaps.',
      icon: 'ri-shake-hands-line',
    },
  ];

  stats = [
    { label: 'Projects Delivered', value: '10+' },
    { label: 'Happy Clients', value: '5+' },
    { label: 'Years Experience', value: '3+' },
    { label: 'Team Members', value: '5+' },
  ];

  contactInfo = {
    email: 'support@250techlab.rw',
    phone: '+250 794 757 629',
    address: 'Kigali, Rwanda',
  };

  socialLinks = [
    { name: 'LinkedIn', icon: 'ri-linkedin-fill', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: 'ri-github-fill', url: 'https://github.com' },
  ];

  formStatus: 'idle' | 'success' | 'error' = 'idle';
  formError = '';
  submitting = false;

  get phoneHref(): string {
    return 'tel:' + this.contactInfo.phone.replace(/\s/g, '');
  }

  get yearsExperience(): string {
    return this.stats.find(s => s.label === 'Years Experience')?.value ?? '';
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitting = true;
    this.formStatus = 'idle';
    this.formError = '';

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    // Honeypot: silently accept bot submissions without sending anything
    const honeypot = data.get('company_alt');
    if (honeypot && typeof honeypot === 'string' && honeypot.trim() !== '') {
      this.formStatus = 'success';
      this.submitting = false;
      return;
    }
    data.delete('company_alt');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        this.formStatus = 'success';
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        this.formStatus = 'error';
        this.formError = body?.errors?.map((e: { message: string }) => e.message).join(', ')
          || 'Something went wrong. Please try again.';
      }
    } catch {
      this.formStatus = 'error';
      this.formError = 'Network error. Please check your connection and try again.';
    } finally {
      this.submitting = false;
    }
  }
}
