<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use JoshEmbling\ImageOptimizer\Facades\ImageOptimizer;

class ImageOptimizationService
{
    protected ImageManager $imageManager;

    public function __construct()
    {
        $this->imageManager = new ImageManager(['driver' => 'gd']);
    }

    /**
     * Process and optimize uploaded images for gallery
     */
    public function processGalleryImage(UploadedFile $file, string $directory = 'gallery-items'): string
    {
        // Generate unique filename
        $filename = time() . '_' . uniqid() . '.webp';
        $path = $directory . '/' . $filename;

        // Process the image
        $image = $this->imageManager->make($file->getPathname());

        // Resize and optimize for gallery display
        $image = $image->cover(1200, 1200); // Square format, 1200x1200

        // Convert to WebP format for better compression
        $optimizedImage = $image->encode('webp', 85); // 85% quality

        // Save to storage
        Storage::disk('public')->put($path, $optimizedImage);

        // Apply additional optimization using the image optimizer package
        $fullPath = Storage::disk('public')->path($path);
        if (file_exists($fullPath)) {
            ImageOptimizer::optimize($fullPath);
        }

        return $path;
    }

    /**
     * Create multiple optimized sizes for responsive images
     */
    public function createResponsiveSizes(UploadedFile $file, string $directory = 'gallery-items'): array
    {
        $baseFilename = time() . '_' . uniqid();
        $sizes = [
            'original' => ['width' => 1200, 'height' => 1200, 'quality' => 85],
            'large' => ['width' => 800, 'height' => 800, 'quality' => 80],
            'medium' => ['width' => 500, 'height' => 500, 'quality' => 75],
            'thumbnail' => ['width' => 300, 'height' => 300, 'quality' => 70],
        ];

        $paths = [];
        $image = $this->imageManager->make($file->getPathname());

        foreach ($sizes as $sizeName => $config) {
            $filename = $baseFilename . '_' . $sizeName . '.webp';
            $path = $directory . '/' . $filename;

            // Resize image
            $resizedImage = $image->cover($config['width'], $config['height']);
            
            // Convert to WebP
            $optimizedImage = $resizedImage->encode('webp', $config['quality']);

            // Save to storage
            Storage::disk('public')->put($path, $optimizedImage);

            // Apply additional optimization
            $fullPath = Storage::disk('public')->path($path);
            if (file_exists($fullPath)) {
                ImageOptimizer::optimize($fullPath);
            }

            $paths[$sizeName] = $path;
        }

        return $paths;
    }

    /**
     * Get file size in human readable format
     */
    public function getOptimizedFileSize(string $path): string
    {
        $fullPath = Storage::disk('public')->path($path);
        if (!file_exists($fullPath)) {
            return 'Unknown';
        }

        $bytes = filesize($fullPath);
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Validate image dimensions and format
     */
    public function validateImage(UploadedFile $file): array
    {
        $errors = [];

        // Check file size (max 10MB)
        if ($file->getSize() > 10 * 1024 * 1024) {
            $errors[] = 'File size must be less than 10MB';
        }

        // Check image dimensions
        $imageSize = getimagesize($file->getPathname());
        if ($imageSize) {
            [$width, $height] = $imageSize;
            
            // Minimum dimensions
            if ($width < 500 || $height < 500) {
                $errors[] = 'Image must be at least 500x500 pixels';
            }

            // Maximum dimensions
            if ($width > 5000 || $height > 5000) {
                $errors[] = 'Image must be less than 5000x5000 pixels';
            }
        }

        // Check file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedTypes)) {
            $errors[] = 'Only JPEG, PNG, and WebP images are allowed';
        }

        return $errors;
    }
}
