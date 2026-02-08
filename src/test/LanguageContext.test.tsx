import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

function TestComponent() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <div data-testid="translated-text">{t('nav.home')}</div>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('es')}>Español</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide language context', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-language')).toBeInTheDocument();
  });

  it('should default to Spanish', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('translated-text')).toHaveTextContent('Inicio');
  });

  it('should change language to English', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const englishButton = screen.getByText('English');
    
    await act(async () => {
      englishButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('current-language')).toHaveTextContent('en');
      expect(screen.getByTestId('translated-text')).toHaveTextContent('Home');
    });
  });

  it('should persist language in localStorage', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const englishButton = screen.getByText('English');
    
    await act(async () => {
      englishButton.click();
    });

    await waitFor(() => {
      expect(localStorage.getItem('portfolio-language')).toBe('en');
    });
  });

  it('should restore language from localStorage', () => {
    localStorage.setItem('portfolio-language', 'en');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('translated-text')).toHaveTextContent('Home');
  });

  it('should return key if translation not found', () => {
    function TestTranslation() {
      const { t } = useLanguage();
      return <div data-testid="missing-key">{t('nonexistent.key')}</div>;
    }

    render(
      <LanguageProvider>
        <TestTranslation />
      </LanguageProvider>
    );

    expect(screen.getByTestId('missing-key')).toHaveTextContent('nonexistent.key');
  });

  it('should throw error when used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');

    consoleSpy.mockRestore();
  });
});