<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser
{

    use HasFactory, Notifiable, MustVerifyEmail, SoftDeletes;

    public function canAccessPanel(Panel $panel): bool
    {
        /* if ($panel->getId() === 'admin') {
            return str_ends_with($this->email, '@wri.org');
        } */
        return true;
    }

    /**
     * @var string[]
     */
    protected $casts = [
        'deleted_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function hasPermission(string $permission): bool
    {
        $permissionsArray = [];

        foreach ($this->roles as $role) {
            foreach ($role->permissions as $singlePermission) {
                $permissionsArray[] = $singlePermission->name;
            }
        }

        return collect($permissionsArray)->unique()->contains($permission);
    }
}
