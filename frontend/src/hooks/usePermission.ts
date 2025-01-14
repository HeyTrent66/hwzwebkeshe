import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UserRole } from '../types/user';

type Action = 'POST_CREATE' | 'POST_EDIT' | 'POST_DELETE' | 'COMMENT_CREATE' | 'COMMENT_DELETE';

export const usePermission = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const hasPermission = (action: Action): boolean => {
    if (!user) return false;

    switch (user.role) {
      case 'ADMIN':
        return true;
      case 'BOARD_ADMIN':
        return ['POST_CREATE', 'POST_EDIT', 'POST_DELETE', 'COMMENT_DELETE'].includes(action);
      case 'USER':
        return ['POST_CREATE', 'COMMENT_CREATE'].includes(action);
      default:
        return false;
    }
  };

  return { hasPermission };
}; 