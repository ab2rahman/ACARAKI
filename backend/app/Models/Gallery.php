<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
    ];

    public function items()
    {
        return $this->hasMany(GalleryItem::class)->ordered();
    }

    public function coverItem()
    {
        return $this->hasOne(GalleryItem::class)->cover();
    }

    public function getCoverImageUrlAttribute()
    {
        $coverItem = $this->coverItem;
        return $coverItem ? $coverItem->image_url : null;
    }

    public function getItemsCountAttribute()
    {
        return $this->items()->count();
    }
}