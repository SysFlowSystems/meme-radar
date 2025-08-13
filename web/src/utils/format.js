import { format, parseISO } from 'date-fns';

export function formatTime(iso) {
  try {
    return format(parseISO(iso), 'MMM d, HH:mm');
  } catch {
    return iso;
  }
}

export function isRecent(tsMs, withinMs) {
  if (!tsMs) return false;
  return Date.now() - Number(tsMs) <= Number(withinMs);
}


