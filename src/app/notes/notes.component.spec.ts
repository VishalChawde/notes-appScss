// Import necessary modules and utilities for testing
import { ComponentFixture, TestBed } from '@angular/core/testing'; // For creating component and test environment
import { NotesComponent } from './notes.component'; // Component to test
import { NotesService, Note } from './notes.service'; // Service and model used in the component
import { FormsModule } from '@angular/forms'; // Required since the component uses [(ngModel)]
import { of, throwError } from 'rxjs'; // Used to mock observables
import { By } from '@angular/platform-browser'; // For DOM queries if needed

describe('NotesComponent', () => {
  let component: NotesComponent; // Actual component instance
  let fixture: ComponentFixture<NotesComponent>; // Wrapper for the component to access template and debug utilities
  let mockNotesService: jasmine.SpyObj<NotesService>; // Spy object to mock NotesService methods

  // Predefined mock data to use in tests
  const mockNotes: Note[] = [
    { _id: '1', title: 'Test Note 1', content: 'This is a test note.', createdAt: new Date().toISOString() },
    { _id: '2', title: 'Test Note 2', content: 'Another note.', createdAt: new Date().toISOString() }
  ];

  // Configure the test module before each test
  beforeEach(async () => {
    // Create a spy object with methods to mock from NotesService
    mockNotesService = jasmine.createSpyObj('NotesService', ['getAllNotes', 'createNote', 'deleteNote', 'updateNote']);

    // Set up the test environment
    await TestBed.configureTestingModule({
      imports: [NotesComponent, FormsModule], // Import the component and FormsModule
      providers: [{ provide: NotesService, useValue: mockNotesService }], // Inject the spy instead of real service
    }).compileComponents(); // Compile template and CSS

    // Create an instance of the component
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
  });

  // Test 1: Should create the component successfully
  it('should create the component', () => {
    expect(component).toBeTruthy(); // Check that component instance exists
  });

  // Test 2: Should fetch notes on init
  it('should fetch notes on init', () => {
    mockNotesService.getAllNotes.and.returnValue(of(mockNotes)); // Mock getAllNotes to return mock data
    fixture.detectChanges(); // Triggers ngOnInit
    expect(component.notes.length).toBe(2); // Expect notes to be fetched
    expect(component.notes[0].title).toBe('Test Note 1');
  });

  // Test 3: Should show error if notes fetch fails
  it('should handle error if note fetch fails', () => {
    mockNotesService.getAllNotes.and.returnValue(throwError(() => new Error('Fetch failed'))); // Simulate error
    fixture.detectChanges(); // Triggers ngOnInit
    expect(component.errorMsg).toBe('Failed to fetch notes.');
  });

  // Test 4: Should add a new note successfully
  it('should add a new note', () => {
    const newNote: Note = { title: 'New', content: 'New note' }; // New note without _id
    component.newNote = newNote; // Set input fields
    mockNotesService.createNote.and.returnValue(of({ ...newNote, _id: '3' })); // Mock createNote
    mockNotesService.getAllNotes.and.returnValue(of([...mockNotes, { ...newNote, _id: '3' }])); // Return updated list

    component.addNote(); // Trigger method
    expect(mockNotesService.createNote).toHaveBeenCalledWith(newNote); // Check if API called with correct data
    expect(component.newNote.title).toBe(''); // Inputs should be reset
    expect(component.newNote.content).toBe('');
  });

  // Test 5: Should prevent adding empty notes
  it('should not add note if title or content is empty', () => {
    component.newNote = { title: '', content: '' }; // Invalid input
    component.addNote(); // Trigger method
    expect(component.errorMsg).toBe('Both title and content are required.');
    expect(mockNotesService.createNote).not.toHaveBeenCalled(); // Service should not be called
  });

  // Test 6: Should delete a note
  it('should delete a note and update the list', () => {
    component.notes = [...mockNotes]; // Assign initial notes
    mockNotesService.deleteNote.and.returnValue(of({ message: 'Deleted' })); // Mock deleteNote

    component.deleteNote('1'); // Call delete method
    expect(mockNotesService.deleteNote).toHaveBeenCalledWith('1');
  });

  // Test 7: Should handle delete failure
  it('should show error if delete fails', () => {
    component.notes = [...mockNotes]; // Assign initial notes
    mockNotesService.deleteNote.and.returnValue(throwError(() => new Error('Delete failed'))); // Simulate error
    component.deleteNote('1'); // Call method
    expect(component.errorMsg).toBe('Delete failed.');
  });

  // Test 8: Should set editing note and cancel editing
  it('should start and cancel edit', () => {
    const note = mockNotes[0]; // Pick a note
    component.startEdit(note); // Begin edit
    expect(component.editingNote?._id).toBe('1'); // Check that note is set

    component.cancelEdit(); // Cancel editing
    expect(component.editingNote).toBeNull(); // Ensure it's cleared
  });

  // Test 9: Should update note successfully
  it('should update a note', () => {
    const updatedNote = { ...mockNotes[0], title: 'Updated', content: 'Updated content' };
    component.editingNote = { ...updatedNote }; // Simulate user editing
    mockNotesService.updateNote.and.returnValue(of(updatedNote)); // Mock updateNote
    mockNotesService.getAllNotes.and.returnValue(of(mockNotes)); // Simulate list refresh

    component.updateNote(); // Trigger update
    expect(mockNotesService.updateNote).toHaveBeenCalledWith('1', {
      title: 'Updated',
      content: 'Updated content',
    });
    expect(component.editingNote).toBeNull(); // Edit mode should exit
  });

  // Test 10: Should handle update error
  it('should handle update error', () => {
    component.editingNote = { ...mockNotes[0] }; // Set note to edit
    mockNotesService.updateNote.and.returnValue(throwError(() => new Error('Update failed'))); // Simulate error
    component.updateNote(); // Trigger update
    expect(component.errorMsg).toBe('Update failed.');
  });
});


