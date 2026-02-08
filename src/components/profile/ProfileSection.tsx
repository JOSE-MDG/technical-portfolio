import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileSectionProps {
  name: string;
  imageUrl?: string;
  showProfile?: boolean;
}

export function ProfileSection({ name, imageUrl, showProfile = true }: ProfileSectionProps) {
  const { t } = useLanguage();

  if (!showProfile) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="section-container">
        <div className="flex items-center gap-6">
          {imageUrl && (
            <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary flex-shrink-0">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-heading font-semibold">{name}</h3>
            <p className="text-muted-foreground">{t('profile.role')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
