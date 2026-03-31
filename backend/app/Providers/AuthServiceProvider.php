<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use App\Notifications\ResetPasswordNotification as CustomResetPasswordNotification;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Use custom reset password notification for Member model
        \App\Models\Member::resetPasswordNotificationUsing(function ($user, $token) {
            $user->notify(new CustomResetPasswordNotification($token));
        });
    }
}
