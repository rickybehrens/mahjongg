// src/helpers/tileImageMap.js

// 1. Vite's glob import feature automatically finds all .png files in the assets/tiles directory.
//    This replaces all 40+ of your manual import lines with just one.
const images = import.meta.glob('../assets/tiles/*.png', { eager: true });

// 2. We create an empty object to hold our final mapping.
export const tileImageMap = {};

// 3. We loop through the files found by the glob import.
for (const path in images) {
    // Get the filename from the path (e.g., "1 Bam.png")
    const fileName = path.split('/').pop();

    // Create a clean key from the filename (e.g., "1 Bam" from "1 Bam.png")
    // This key is what we will use to look up the image.
    const key = fileName.substring(0, fileName.lastIndexOf('.'));
    
    // 4. Populate our map.
    //    The key is the clean name (e.g., "1 Bam").
    //    The value is the actual image module.
    tileImageMap[key] = images[path].default;
}