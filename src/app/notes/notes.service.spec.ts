// Import Angular testing utilities and modules for mocking HTTP requests
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Import the service and the Note model
import { NotesService, Note } from './notes.service';
import { HttpService } from '../core/http.service';

describe('NotesService', () => {
  let service: NotesService; // Instance of the service to test
  let httpMock: HttpTestingController; // Controller to mock and verify HTTP requests

  // This block runs before each test
  beforeEach(() => {
    // Configure the testing module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import module to mock HttpClient
      providers: [NotesService, HttpService] // Provide the service and its dependency
    });

    // Inject the service and mock controller
    service = TestBed.inject(NotesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // This block ensures there are no leftover HTTP requests after each test
  afterEach(() => httpMock.verify());

  // ✅ Test 1: Get all notes
  it('should fetch all notes', () => {
    const dummyNotes: Note[] = [{ title: 'Test Note', content: 'Just a test' }]; // Mock response

    // Call the service method
    service.getAllNotes().subscribe(notes => {
      expect(notes.length).toBe(1); // Verify array length
      expect(notes[0].title).toBe('Test Note'); // Verify content
    });

    // Expect the correct URL and HTTP method
    const req = httpMock.expectOne('http://localhost:5000/api/notes/get/allData');
    expect(req.request.method).toBe('GET');

    // Simulate server response
    req.flush(dummyNotes);
  });

  // ✅ Test 2: Create a single note
  it('should create a new note', () => {
    const newNote: Note = { title: 'New', content: 'Hello' }; // Mock note to send

    // Call the service method
    service.createNote(newNote).subscribe(note => {
      expect(note).toEqual(newNote); // Expect response to match sent note
    });

    // Expect correct URL and method
    const req = httpMock.expectOne('http://localhost:5000/api/notes/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newNote); // Body should match sent note

    // Simulate response
    req.flush(newNote);
  });

  // ✅ Test 3: Create multiple notes
  it('should create multiple notes', () => {
    const notes: Note[] = [
      { title: 'Note 1', content: 'Content 1' },
      { title: 'Note 2', content: 'Content 2' }
    ]; // Array of notes to create

    // Call the service method
    service.createMultipleNotes(notes).subscribe(resp => {
      expect(resp.length).toBe(2); // Should return both notes
    });

    // Expect correct URL and POST method
    const req = httpMock.expectOne('http://localhost:5000/api/notes/create/multiple');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(notes); // Check sent body

    // Simulate response
    req.flush(notes);
  });

  // ✅ Test 4: Delete a note
  it('should delete a note', () => {
    const id = '12345'; // Note ID to delete

    // Call the service method
    service.deleteNote(id).subscribe(response => {
      expect(response).toEqual({}); // Expect an empty object or deletion response
    });

    // Expect the URL and POST method
    const req = httpMock.expectOne(`http://localhost:5000/api/notes/delete/${id}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({}); // Usually an empty body for delete

    // Simulate response
    req.flush({});
  });

  // ✅ Test 5: Update a note
  it('should update a note', () => {
    const id = '123'; // ID of the note to update
    const updatedNote: Note = { title: 'Updated', content: 'Updated content' }; // Updated data

    // Call the service method
    service.updateNote(id, updatedNote).subscribe(resp => {
      expect(resp).toEqual(updatedNote); // Expect the same object back
    });

    // Expect correct URL and POST method
    const req = httpMock.expectOne(`http://localhost:5000/api/notes/update/${id}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(updatedNote); // Expect updated data as request body

    // Simulate response
    req.flush(updatedNote);
  });
});
