import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

export type ReaderResult = string | ArrayBuffer | null;

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient,
              private readonly _user: UserService) { }

  createImageFromBlob(image: Blob): Promise<ReaderResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(image);
    });
  }

  getImage(id: string, name: string) {
    return this._http.get(
      `${ this.apiUrl }/images/${ id }/${ name }`,
      { responseType: 'blob' }
    );
  }

  uploadImages(id: string, images: File[]) {
    const formData = new FormData();

    for (const image of images)
      formData.append('images', image);

    return this._http.post(`${ this.apiUrl }/images/${ id }`, formData);
  }

  deleteImages(id: string) {
    return this._http.delete(`${ this.apiUrl }/images/${ id }`);
  }
}
