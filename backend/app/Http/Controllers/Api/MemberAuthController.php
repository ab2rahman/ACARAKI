<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Member;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
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

    /**
     * Send password reset link email
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|exists:members,email',
        ], [
            'email.exists' => 'Email tidak ditemukan dalam sistem kami.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $status = Password::broker('members')->sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Link reset password telah dikirim ke email Anda.'
            ], 200);
        }

        return response()->json([
            'message' => 'Gagal mengirim link reset password. Silakan coba lagi.'
        ], 500);
    }

    /**
     * Reset password with token
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'email' => 'required|string|email|exists:members,email',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'email.exists' => 'Email tidak ditemukan dalam sistem kami.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'password.min' => 'Password harus minimal 8 karakter.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $status = Password::broker('members')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Password berhasil direset. Silakan login dengan password baru Anda.'
            ], 200);
        }

        return response()->json([
            'message' => 'Token reset password tidak valid atau sudah kedaluwarsa.'
        ], 400);
    }

    /**
     * Change password for authenticated user
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|different:current_password|confirmed',
        ], [
            'password.confirmed' => 'Konfirmasi password baru tidak cocok.',
            'password.min' => 'Password baru harus minimal 8 karakter.',
            'password.different' => 'Password baru harus berbeda dengan password saat ini.',
            'current_password.required' => 'Password saat ini harus diisi.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();

        // Verify current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Password saat ini tidak benar.'
            ], 401);
        }

        // Update password
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password berhasil diubah.'
        ], 200);
    }
}
