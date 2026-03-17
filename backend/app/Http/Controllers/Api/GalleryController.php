<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    /**
     * Get all galleries sorted by ID descending
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $galleries = Gallery::with(['coverItem:id,gallery_id,image_path,is_cover'])
                ->withCount('items')
                ->orderBy('id', 'desc')
                ->get(['id', 'title', 'slug', 'description', 'created_at']);
            
            // Transform the data to include cover image URL
            $galleries->transform(function ($gallery) {
                return [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'slug' => $gallery->slug,
                    'description' => $gallery->description,
                    'items_count' => $gallery->items_count,
                    'cover_image_url' => $gallery->coverItem ? url($gallery->coverItem->image_url) : null,
                    'created_at' => $gallery->created_at,
                ];
            });
            
            return response()->json([
                'status' => 'success',
                'data' => $galleries,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all images of a gallery by slug
     *
     * @param string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($slug)
    {
        try {
            $gallery = Gallery::with(['items' => function ($query) {
                    $query->ordered()->select('id', 'gallery_id', 'image_path', 'alt_text', 'is_cover', 'sort_order', 'created_at');
                }])
                ->where('slug', $slug)
                ->firstOrFail(['id', 'title', 'slug', 'description', 'created_at']);
            
            // Transform gallery items to include image URLs
            $gallery->items->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'image_path' => $item->image_path,
                    'image_url' => url($item->image_url),
                    'alt_text' => $item->alt_text,
                    'is_cover' => $item->is_cover,
                    'sort_order' => $item->sort_order,
                    'created_at' => $item->created_at,
                ];
            });
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'slug' => $gallery->slug,
                    'description' => $gallery->description,
                    'created_at' => $gallery->created_at,
                    'items' => $gallery->items,
                    'items_count' => $gallery->items->count(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 404);
        }
    }
}
