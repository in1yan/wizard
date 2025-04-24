import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, updateNote } from '@/lib/api';
import { Note, NoteResponse } from '@/lib/types';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Notes = () => {
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const response = await getNotes();
      return response.notes as Note[];
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => 
      updateNote(id, content),
    onSuccess: (data: NoteResponse) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setSelectedNote(data.note);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Note updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    },
  });

  const handleEditClick = () => {
    if (selectedNote) {
      setEditedContent(selectedNote.note);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedNote && editedContent.trim() !== '') {
      updateNoteMutation.mutate({ id: selectedNote.id, content: editedContent });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Saved Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((note) => (
            <Card 
              key={note.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                setSelectedNote(note);
                setIsEditing(false);
              }}
            >
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {format(new Date(note.created_at), 'PPp')}
                </p>
                <div className="prose prose-sm dark:prose-invert line-clamp-3">
                  <ReactMarkdown>{note.note}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between w-full pr-8">
                <DialogTitle>
                  Note from {format(selectedNote?.created_at ? new Date(selectedNote.created_at) : new Date(), 'PPp')}
                </DialogTitle>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick();
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </DialogHeader>
            <div className="mt-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm dark:prose-invert">
                  <ReactMarkdown>{selectedNote?.note || ''}</ReactMarkdown>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Notes;
