import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraPhoto } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { PhotoData } from 'src/app/models/photoData';
import { AuthService } from 'src/app/services/auth.service';
import { CameraService } from 'src/app/services/camera.service';
import { PhotosDataService } from 'src/app/services/photos-data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  uploadProgress:number;
  userEmail:string;  
  userName:string;  

  constructor(public toastController: ToastController,
    private router:Router, 
    private cameraSerivce:CameraService, 
    private storageService:StorageService, 
    private authService:AuthService,
    private photoDataService:PhotosDataService) {    
      
  }

  ngOnInit() {
    this.uploadProgress = 0;
    this.userEmail = this.authService.GetCurrentUser().email;
    this.userName = this.authService.GetCurrentUser().nombre;
  }

  clickLogout(){
    this.authService.Desloguearse();
  }

  takePhoto(type:number){
    let typeBool = type == 1? true: false;
    this.addPhotoToGallery(typeBool);
  }

  goToList(){
    this.router.navigate(['list']);
  }

  async addPhotoToGallery(type:boolean) {
    const photo = await this.cameraSerivce.addNewToGallery();
    this.uploadPhoto(photo, type).then();
  }

  private async uploadPhoto(cameraPhoto: CameraPhoto, type:boolean) {    
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    const filePath = this.getFilePath();
    
    const uploadTask = this.storageService.saveFile(blob, filePath);    
    
    uploadTask.percentageChanges().subscribe(change =>{
      this.uploadProgress = change;
    });

    uploadTask.then(async res =>{
      const downloadURL = await res.ref.getDownloadURL();
        
      await this.savePhotoData(downloadURL, type, filePath).then(async res =>{
        const toast = await this.toastController.create({
          duration:3000,
          message: "Se completó la subida"
        });
        toast.present();
      });
    })    
  }

  getFilePath(){
    return new Date().getTime() + '-test';
  }

  private async savePhotoData(fileUrl:string, type:boolean, fileName:string){
    let data:PhotoData = new PhotoData();

    data.date = Date.now();
    data.photoUrl = fileUrl;
    data.points = 0;
    data.type = type;
    data.userEmail = this.userEmail;
    data.userName = this.userName;
    data.photoName = fileName;

    return this.photoDataService.addItem(data);
  }

}
