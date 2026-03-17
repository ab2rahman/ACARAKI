<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'date',
    ];

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    public function getImageUrlAttribute()
    {
        return Storage::url($this->image);
    }
}
