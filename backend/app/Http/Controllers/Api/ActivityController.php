<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Activity;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Festival;
use App\Models\Booth;
class ActivityController extends Controller
{
    //

    public function uploadTicket(Request $request)
    {
        $request->validate([
            'ticket' => 'required|file|mimes:jpg,jpeg,png,pdf',
        ]);

        $path = $request->file('ticket')->store('tickets');

        Activity::create([
            'member_id' => $request->user()->id,
            'type' => 'ticket_upload',
            'points_gained' => 0, // Points to be awarded after admin approval
        ]);

        return response()->json(['message' => 'Ticket uploaded successfully.'], 201);
    }

    public function checkInWithQRCode(Request $request)
    {
        $request->validate([
            'qr_code' => 'required|string',
        ]);

        // Check for festival first
        $festival = Festival::where('code', $request->qr_code)->first();
        
        if ($festival) {
            // Check if user already checked in for this festival
            $activity = Activity::where('member_id', $request->user()->id)
                ->where('festival_id', $festival->id)
                ->first();

            if ($activity) {
                return response()->json(['message' => 'Anda sudah check in untuk festival ini.'], 400);
            }

            $newActivity = Activity::create([
                'member_id' => $request->user()->id,
                'festival_id' => $festival->id,
                'type' => 'qr_check_in',
                'points_gained' => 100, // Points for festival check-in
            ]);

            if ($newActivity) {
                $request->user()->increment('total_points', $newActivity->points_gained);
            }

            return response()->json(['message' => 'Anda mendapatkan poin sebesar ' . $newActivity->points_gained . '.'], 200);
        }

        // Check for booth if festival not found
        $booth = Booth::where('code', $request->qr_code)->first();
        
        if ($booth) {
            // Check if user already checked in for this booth
            $activity = Activity::where('member_id', $request->user()->id)
                ->where('booth_id', $booth->id)
                ->first();

            if ($activity) {
                return response()->json(['message' => 'Anda sudah check in untuk booth ini.'], 400);
            }

            $newActivity = Activity::create([
                'member_id' => $request->user()->id,
                'booth_id' => $booth->id,
                'type' => 'booth_check_in',
                'points_gained' => 50, // Points for booth check-in
            ]);

            if ($newActivity) {
                $request->user()->increment('total_points', $newActivity->points_gained);
            }

            return response()->json(['message' => 'Anda mendapatkan poin sebesar ' . $newActivity->points_gained . '.'], 200);
        }

        // Neither festival nor booth found
        return response()->json(['message' => 'Kode QR tidak valid.'], 400);
    }

    public function activities(Request $request)
    {
        $activities = Activity::with(['festival', 'booth'])->where('member_id', $request->user()->id)->get();
        $activities = $activities->map(function ($activity) {
            if ($activity->festival) {
                return [
                    'id' => $activity->id,
                    'title' => $activity->festival->title,
                    'type' => $activity->type,
                    'points_gained' => $activity->points_gained,
                    'date' => $activity->festival->indonesian_date,
                ];
            } elseif ($activity->booth) {
                return [
                    'id' => $activity->id,
                    'title' => $activity->booth->name,
                    'type' => $activity->type,
                    'points_gained' => $activity->points_gained,
                    'date' => $activity->booth->indonesian_date,
                ];
            } else {
                return [
                    'id' => $activity->id,
                    'title' => 'Unknown Activity',
                    'type' => $activity->type,
                    'points_gained' => $activity->points_gained,
                    'date' => $activity->created_at->format('l, d F Y'),
                ];
            }
        });
        return response()->json($activities);
    }
}
