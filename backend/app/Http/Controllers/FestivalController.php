<?php

namespace App\Http\Controllers;

use App\Models\Festival;

class FestivalController extends Controller
{
    /**
     * Display QR code by code
     */
    public function showQRCode($code)
    {
        $festival = Festival::where('code', $code)->first();

        if (!$festival || !$festival->qrcode_image) {
            abort(404, 'QR code not found');
        }

        $imagePath = storage_path('app/public/' . $festival->qrcode_image);
        
        if (!file_exists($imagePath)) {
            abort(404, 'QR code image not found');
        }

        return response()->file($imagePath);
    }

    /**
     * Get all festivals (for API access)
     */
    public function index()
    {
        $festival = Festival::orderBy('date', 'desc')->first();
        $festival->append('indonesian_date');

        return response()->json([
            'success' => true,
            'data' => $festival,
        ]);
    }

    /**
     * Get festival details by code (for API access)
     */
    public function show($code)
    {
        $festival = Festival::where('code', $code)->first();

        if (!$festival) {
            return response()->json([
                'success' => false,
                'message' => 'Festival not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $festival,
        ]);
    }
}
