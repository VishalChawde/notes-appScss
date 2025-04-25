import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService, Note } from '../notes/notes.service';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})export class NotesComponent {
  notesService = inject(NotesService);

  notes: Note[] = [];
  newNote: Note = { title: '', content: '' };
  errorMsg = '';

  editingNote: Note | null = null;

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.notesService.getAllNotes().subscribe({
      next: (data) => this.notes = data,
      error: () => this.errorMsg = 'Failed to fetch notes.'
    });
  }

  addNote() {
    if (!this.newNote.title.trim() || !this.newNote.content.trim()) {
      this.errorMsg = 'Both title and content are required.';
      return;
    }

    this.notesService.createNote(this.newNote).subscribe({
      next: (createdNote) => {
       
        this.fetchNotes();
        this.newNote = { title: '', content: '' };
        this.errorMsg = '';
      },
      error: () => (this.errorMsg = 'Failed to add note.'),
    });
  }
  

  deleteNote(id: string) {
    this.notesService.deleteNote(id).subscribe({
      next: (res) => {
        console.log(res.message);
        this.notes = this.notes.filter(note => note._id !== id);
        this.errorMsg = '';
      },
      error: () => (this.errorMsg = 'Delete failed.'),
    });
   this.reloadPage();
  }

  reloadPage() {
    if (!(window as any).__karma__) {
      window.location.reload();
    }
  }

  startEdit(note: Note) {
    this.editingNote = { ...note };
  }

  cancelEdit() {
    this.editingNote = null;
  }

  updateNote() {
    if (!this.editingNote || !this.editingNote._id) return;

    const { _id, title, content } = this.editingNote;

    this.notesService.updateNote(_id, { title, content }).subscribe({
      next: () => {
        this.editingNote = null;
        this.fetchNotes();
      },
      error: () => (this.errorMsg = 'Update failed.'),
    });
  }
}