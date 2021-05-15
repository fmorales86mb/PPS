import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {  

  constructor() {}

  public async addNewToGallery() :Promise<CameraPhoto> {
    const capturedPhoto = await Camera.getPhoto ({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100,
    });
    return capturedPhoto;
  }
  
}
