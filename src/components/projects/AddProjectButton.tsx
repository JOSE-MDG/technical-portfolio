import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus } from 'lucide-react';
import { AddProjectForm } from './AddProjectForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function AddProjectButton() {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-dashed border-border rounded-md hover:border-accent hover:text-accent transition-colors"
      >
        <Plus className="w-4 h-4" />
        {t('projects.addNew')}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-6 border-b border-border">
            <DialogTitle className="text-xl font-heading font-semibold">
              {t('projects.addNew')}
            </DialogTitle>
          </DialogHeader>
          <AddProjectForm onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}