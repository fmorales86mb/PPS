export interface IUser{
    name:string;
    email:string;
}

export interface IPhotoVote{
    isVote:boolean;
    photoUrl:string;
    photoName:string;
}

export interface IUserInfo{
    id:string;
    user:IUser;
    vote1:IPhotoVote;
    vote2:IPhotoVote;
}
