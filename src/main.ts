import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpService } from '../src/app/core/http.service'; // ✅ adjust the path
import { NotesService } from '../src/app/notes/notes.service'; // optional if needed manually

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    HttpService,     // ✅ Register this to resolve NullInjectorError
    NotesService     // optional if directly injecting in app
  ]
}).catch(err => console.error(err));
