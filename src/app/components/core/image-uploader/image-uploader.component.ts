import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ImageService } from '../../../services/image.service';

@Component({
    selector: 'app-image-uploader',
    standalone: true,
    imports: [
        MatIconModule,
        MatFormFieldModule,
        CommonModule
    ],
    templateUrl: './image-uploader.component.html',
    styleUrl: './image-uploader.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ImageUploaderComponent {
    @HostBinding('className') className = 'image-uploader';

    @Input() maxNumber = 5;
    @Input() imagesUrls: string[] = [];

    previewImages: { file: File, preview: string }[] = [];
    isUploading = false;
    private _imageUrlToRemove: string[] = [];

    private readonly _imageService: ImageService = inject(ImageService);

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            const files = Array.from(input.files);

            if (this.previewImages.length + this.imagesUrls.length + files.length > this.maxNumber) {
                alert(`Puoi caricare un massimo di ${this.maxNumber} immagini.`);
                return;
            }

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    this.previewImages.push({ file, preview: reader.result as string });
                };
                reader.readAsDataURL(file);
            });
        }
    }

    removeImage(index: number): void {
        if (index < this.imagesUrls.length) {
            this._imageUrlToRemove.push(this.imagesUrls[index]);
            this.imagesUrls.splice(index, 1);
        } else {
            this.previewImages.splice(index - this.imagesUrls.length, 1);
        }
    }

    async saveChanges(): Promise<string[]> {
        this.isUploading = true;

        if (!this.previewImages.length) {
            this.isUploading = false;
            return this.imagesUrls;
        }

        try {
            this._imageUrlToRemove.forEach(async item => {
                await this._imageService.deleteImage(item)
            })

            for (const image of this.previewImages) {
                const imageUrl = await this._imageService.uploadImage(image.file);
                this.imagesUrls.push(imageUrl);
            }

            this.previewImages = [];
            this.isUploading = false;

            return this.imagesUrls;
        } catch (error) {
            console.error('Errore durante il caricamento delle immagini:', error);
            this.isUploading = false;
            return [];
        }
    }
}
