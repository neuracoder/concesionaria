/**
 * Optimizes an image file by resizing and converting to WebP.
 * @param file The input file (image)
 * @param maxWidth Maximum width in pixels (default: 1920)
 * @param quality Quality from 0 to 1 (default: 0.8)
 * @returns Promise resolving to a base64 string
 */
export const optimizeImage = (
    file: File,
    maxWidth: number = 1920,
    quality: number = 0.8
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                // Calculate new dimensions
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                // Draw and convert
                ctx.drawImage(img, 0, 0, width, height);

                // To WebP Base64
                const optimizedBase64 = canvas.toDataURL('image/webp', quality);
                resolve(optimizedBase64);
            };

            img.onerror = (err) => reject(err);
        };

        reader.onerror = (err) => reject(err);
    });
};
