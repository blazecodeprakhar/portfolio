import { useEffect } from "react";

export const useImagePreloader = (images: string[]) => {
    useEffect(() => {
        const preloadImage = (src: string) => {
            const img = new Image();
            img.src = src;
        };

        if (images && images.length > 0) {
            images.forEach((image) => {
                preloadImage(image);
            });
        }
    }, [images]);
};
