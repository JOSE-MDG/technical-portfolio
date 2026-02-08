import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectStatus } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProjectStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage();

  const statusConfig = {
    active: {
      label: t('status.active'),
      className: 'status-badge status-active',
    },
    wip: {
      label: t('status.wip'),
      className: 'status-badge status-wip',
    },
    archived: {
      label: t('status.archived'),
      className: 'status-badge status-archived',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={cn(config.className)}>
      {config.label}
    </span>
  );
}
