import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm font-mono">
      <button
        onClick={() => setLanguage('es')}
        className={cn(
          "px-2 py-1 rounded transition-colors",
          language === 'es'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        ES
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-2 py-1 rounded transition-colors",
          language === 'en'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
