
export interface Note {
  id: number;
  user: string;
  note: string;  // Changed from the previous definition
  created_at: string;
}

export interface NoteResponse {
  response: string;
  note: Note;
}
