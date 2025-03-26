
export interface CalendarEvent {
  id?: string;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
  attendees?: string[];
  isAllDay?: boolean;
  status?: 'confirmed' | 'tentative' | 'cancelled';
}

export interface CalendarState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
}
