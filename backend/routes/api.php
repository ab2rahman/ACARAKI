<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\SubscriptionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\MemberAuthController;
use App\Http\Controllers\Api\ActivityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/


Route::post('/subscribe', [SubscriptionController::class, 'store']);

// Event routes
Route::get('/event', [EventController::class, 'index']);

// Event and gallery routes without CSRF protection
Route::get('/event/{slug}', [EventController::class, 'show']);
Route::post('/event/{slug}/submission', [EventController::class, 'storeSubmission']);
// Gallery routes
Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/{slug}', [GalleryController::class, 'show']);

// Group auth routes
Route::prefix('auth')->group(function () {
    // Public auth routes
    Route::post('/register', [MemberAuthController::class, 'register']);
    Route::post('/login', [MemberAuthController::class, 'login']);
    Route::post('/forgot-password', [MemberAuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [MemberAuthController::class, 'resetPassword']);

    // Protected auth routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [MemberAuthController::class, 'logout']);
        Route::post('/refresh', [MemberAuthController::class, 'refresh']);
        Route::get('/me', [MemberAuthController::class, 'me']);
        Route::post('/change-password', [MemberAuthController::class, 'changePassword']);
    });
});

// Protected activity routes
Route::prefix('member')->middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [MemberAuthController::class, 'profile']);
    Route::post('/upload-ticket', [ActivityController::class, 'uploadTicket']);
    Route::get('/activities', [ActivityController::class, 'activities']);
    Route::post('/check-in', [ActivityController::class, 'checkInWithQRCode']);
});

// Festival routes  
Route::get('/festival', [\App\Http\Controllers\FestivalController::class, 'index']);
// Route::prefix('festivals')->group(function () {
    // Route::get('/{code}', [\App\Http\Controllers\FestivalController::class, 'show']);
// });