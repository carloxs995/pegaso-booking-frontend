import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private storage = getStorage();

    async uploadImage(file: File): Promise<string> {
        const storageRef = ref(this.storage, `rooms/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);

        return await getDownloadURL(uploadTask.ref);
    }

    async deleteImage(imageUrl: string): Promise<void> {
        const storageRef = ref(this.storage, imageUrl);
        await deleteObject(storageRef);
    }
}
