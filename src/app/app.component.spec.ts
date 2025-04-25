// Import Angular testing utilities and component to test
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Import utility to allow module-level HTTP mocks
import { importProvidersFrom } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {

  // Setup before each test runs
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [], // No standalone imports used directly
      providers: [
        importProvidersFrom(HttpClientTestingModule) // Provide mock HTTP services for any HTTP calls
      ]
    }).compileComponents(); // Compiles components for testing
  });

  // Test Case 1: AppComponent should be created successfully
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Creates a test instance of AppComponent
    const app = fixture.componentInstance; // Access the component instance
    expect(app).toBeTruthy(); // Assert that the app component exists
  });

  // Test Case 2: Title should be 'notes-app'
  it(`should have the 'notes-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('notes-app'); // Check the value of the title property
  });

  // Test Case 3: Should render title text in the HTML
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // Create component fixture
    fixture.detectChanges(); // Trigger Angular's change detection to render the DOM
    const compiled = fixture.nativeElement as HTMLElement; // Access native DOM
    expect(compiled.textContent).toContain('Notes'); // Validate that 'Notes' is rendered in the template
  });
});
