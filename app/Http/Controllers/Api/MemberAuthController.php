<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Member;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
class MemberAuthController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:members',
            'phone' => 'required|string|max:15',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|string|min:8|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $member = Member::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'age' => $request->age,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
            'is_verified' => true,
        ]);

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer'], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $member = Member::where('email', $request->email)->first();

        Log::info($member);
        if (! $member || ! Hash::check($request->password, $member->password)) {
            return response()->json(['message' => 'Login gagal. Periksa kembali email dan password Anda.'], 401);
        }

        $token = $member->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer'], 200);
    }

    public function logout(Request $request)
    {
        // Revoke the current user's token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function refresh(Request $request)
    {
        // Revoke the current token
        $request->user()->currentAccessToken()->delete();

        // Create a new token
        $token = $request->user()->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 200);
    }

    public function me(Request $request)
    {
        $member = $request->user();
        if (!$member) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        return response()->json(['message' => 'Valid token'], 200);
    }

    public function profile(Request $request)
    {
        $member = $request->user();
        return response()->json(['message' => 'Profile fetched successfully', 'data' => $member], 200);
    }
}
