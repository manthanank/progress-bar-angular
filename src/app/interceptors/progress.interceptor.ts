import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ProgressService } from '../services/progress.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progressService: ProgressService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      reportProgress: true
    });

    this.progressService.reset(); // Reset progress before starting a new request

    return next.handle(clonedRequest).pipe(
      tap(event => {
        if (event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / (event.total || event.loaded));
          this.progressService.setProgress(percentDone);
        } else if (event instanceof HttpResponse) {
          this.progressService.complete();
        }
      })
    );
  }
}
