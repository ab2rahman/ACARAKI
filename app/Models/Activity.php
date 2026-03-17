<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'festival_id',
        'booth_id',
        'type',
        'image',
        'status',
        'points_gained',
    ];

    protected $casts = [
        'image' => 'string',
        'status' => 'string',
        'points_gained' => 'integer',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function festival()
    {
        return $this->belongsTo(Festival::class);
    }

    public function booth()
    {
        return $this->belongsTo(Booth::class);
    }
}
