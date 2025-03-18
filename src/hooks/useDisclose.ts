import { useCallback, useState } from 'react';

export const useDisclose = (propsIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(propsIsOpen);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return { isOpen, onClose, onOpen, onToggle };
};
