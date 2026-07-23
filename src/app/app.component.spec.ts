import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RevealDirective } from './reveal.directive';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, RevealDirective]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero heading', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('250TechLab');
  });

  it('should render all five services', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('#services h3').length).toBe(5);
  });

  it('should toggle the mobile menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('button[aria-label="Toggle menu"]')!;

    expect(compiled.querySelector('nav .flex-col')).toBeNull();
    toggle.click();
    fixture.detectChanges();
    expect(compiled.querySelector('nav .flex-col')).not.toBeNull();
    toggle.click();
    fixture.detectChanges();
    expect(compiled.querySelector('nav .flex-col')).toBeNull();
  });

  it('should fake success and skip the network when the honeypot is filled', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const fetchSpy = spyOn(window, 'fetch');

    const compiled = fixture.nativeElement as HTMLElement;
    const honeypot = compiled.querySelector<HTMLInputElement>('input[name="company_alt"]')!;
    honeypot.removeAttribute('readonly');
    honeypot.value = 'bot';

    const form = compiled.querySelector<HTMLFormElement>('form')!;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();

    expect(app.formStatus).toBe('success');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should show the current year in the footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('footer')?.textContent).toContain(`© ${new Date().getFullYear()} 250TechLab`);
  });
});
