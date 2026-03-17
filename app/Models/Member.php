<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Member extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'age',
        'gender',
        'is_verified',
        'total_points',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'total_points' => 'integer',
        'password' => 'hashed',
    ];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
