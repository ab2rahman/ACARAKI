<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    public function __construct(public readonly string $token)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $resetUrl = $this->resetUrl($notifiable);

        return (new MailMessage)
            ->subject('Reset Password - Festival Jamu Nusantara')
            ->greeting('Halo ' . $notifiable->name . ',')
            ->line('Anda menerima email ini karena kami menerima permintaan reset password untuk akun Anda.')
            ->action('Reset Password', $resetUrl)
            ->line('Link reset password ini akan kedaluwarsa dalam 60 menit.')
            ->line('Jika Anda tidak meminta reset password, silakan abaikan email ini.');
    }

    protected function resetUrl(object $notifiable): string
    {
        return url('/member/reset-password/' . $this->token . '?email=' . urlencode($notifiable->email));
    }
}
