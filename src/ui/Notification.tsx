import { useEffect } from 'react';
import type { NotificationPayload } from '@/core/types';
import { appState } from '@/core/AppState';
import './Notification.css';

interface NotificationProps {
  notification: NotificationPayload;
}

export function Notification({ notification }: NotificationProps) {
  useEffect(() => {
    const duration = notification.durationMs ?? 4000;
    const timer = setTimeout(() => appState.clearNotification(), duration);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="notification" role="alert">
      <div className="notification-title">{notification.title}</div>
      <div className="notification-message">{notification.message}</div>
      <button
        className="notification-dismiss"
        onClick={() => appState.clearNotification()}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
