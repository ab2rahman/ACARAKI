<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Get all events
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $events = Event::all();
            
            return response()->json([
                'status' => 'success',
                'data' => $events,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get a specific event by slug with CSRF token
     *
     * @param string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($slug)
    {
        try {
            $event = Event::where('slug', $slug)->firstOrFail(['id', 'title', 'slug', 'description', 'image', 'date']);
            
            return response()->json([
                'status' => 'success',
                'data' => $event,
                'csrf_token' => csrf_token(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Store a new submission for an event
     *
     * @param Request $request
     * @param string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeSubmission(Request $request, $slug)
    {
        try {
            Log::info('storeSubmission', ['request' => $request->all()]);
            $event = Event::where('slug', $slug)->firstOrFail();
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:255',
                'job_title' => 'string|max:255',
                'age' => 'string|max:255',
                'gender' => 'string|in:male,female,other',
                'short_bio' => 'string',
                'id_image' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,gif',
                'file_1' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,gif',
                'file_2' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,gif',
                'file_3' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,gif',
                'file_4' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,gif',
                'file_5' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,gif',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }
            
            $id_image = $request->file('id_image');
            $file_1 = $request->file('file_1');
            $file_2 = $request->file('file_2');
            $file_3 = $request->file('file_3');
            $file_4 = $request->file('file_4');
            $file_5 = $request->file('file_5');
            
            // Store the image with custom handling
            try {
                if ($id_image) {
                    $id_image_path = $id_image->store('submissions', 'public');
                }
                if ($file_1) {
                    $file_1_path = $file_1->store('submissions', 'public');
                }
                if ($file_2) {
                    $file_2_path = $file_2->store('submissions', 'public');
                }
                if ($file_3) {
                    $file_3_path = $file_3->store('submissions', 'public');
                }
                if ($file_4) {
                    $file_4_path = $file_4->store('submissions', 'public');
                }
                if ($file_5) {
                    $file_5_path = $file_5->store('submissions', 'public');
                }
                
                // Store the submission with image path
                $submission = new Submission();
                $submission->name = $request->name;
                $submission->email = $request->email;
                $submission->phone = $request->phone;
                $submission->job_title = $request->job_title;
                $submission->age = $request->age;
                $submission->gender = $request->gender;
                $submission->short_bio = $request->short_bio;
                $submission->id_image = $id_image ? $id_image_path : null;
                $submission->file_1 = $file_1 ? $file_1_path : null;
                $submission->file_2 = $file_2 ? $file_2_path : null;
                $submission->file_3 = $file_3 ? $file_3_path : null;
                $submission->file_4 = $file_4 ? $file_4_path : null;
                $submission->file_5 = $file_5 ? $file_5_path : null;
                $submission->event_id = $event->id;
                $submission->save();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Submission created successfully',
                    'data' => $submission,
                ], 201);
                
            } catch (\Exception $e) {
                Log::error('File upload failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'File upload failed',
                    'errors' => ['id_image' => ['The file could not be saved: ' . $e->getMessage()]],
                ], 422);
            }
            
        } catch (\Exception $e) {
            Log::error('Submission creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'trace' => app()->environment('production') ? null : $e->getTraceAsString(),
            ], 500);
        }
    }
} 