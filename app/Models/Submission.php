<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'job_title',
        'age',
        'gender',
        'short_bio',
        'id_image',
        'event_id',
        'file_1',
        'file_2',
        'file_3',
        'file_4',
        'file_5',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
