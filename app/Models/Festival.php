<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use Carbon\Carbon;

class Festival extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'date',
        'location',
        'ticket_url',
        'tickets',
        'code',
        'qrcode_image',
    ];

    protected $casts = [
        'date' => 'date',
        'tickets' => 'json',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($festival) {
            // Generate unique code if not provided
            if (empty($festival->code)) {
                $festival->code = static::generateUniqueCode();
            }
            
            // Generate QR code
            $festival->qrcode_image = static::generateQRCode($festival->code);
        });

        static::updating(function ($festival) {
            // Regenerate QR code if code changed
            if ($festival->isDirty('code')) {
                // Delete old QR code if exists
                if ($festival->getOriginal('qrcode_image')) {
                    Storage::disk('public')->delete($festival->getOriginal('qrcode_image'));
                }
                
                // Generate new QR code
                $festival->qrcode_image = static::generateQRCode($festival->code);
            }
        });

        static::deleting(function ($festival) {
            // Delete QR code image when festival is deleted
            if ($festival->qrcode_image) {
                Storage::disk('public')->delete($festival->qrcode_image);
            }
        });
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    public function getQrcodeImageUrlAttribute()
    {
        return $this->qrcode_image ? Storage::url($this->qrcode_image) : null;
    }

    public function getIndonesianDateAttribute()
    {
        return Carbon::parse($this->date)->locale('id')->translatedFormat('l, d F Y');
    }

    /**
     * Generate a unique 12-character alphanumeric code
     */
    public static function generateUniqueCode()
    {
        do {
            $code = '';
            $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            
            for ($i = 0; $i < 12; $i++) {
                $code .= $characters[rand(0, $charactersLength - 1)];
            }
            
        } while (static::where('code', $code)->exists());

        return $code;
    }

    /**
     * Generate QR code image and save to storage
     */
    public static function generateQRCode($code)
    {
        // Create QR code URL
        $qrUrl = env('FRONTEND_APP_URL') . "/check-in/{$code}";
        
        // Configure QR code options
        $options = new QROptions([
            'version'    => 5,
            'outputType' => QRCode::OUTPUT_IMAGE_PNG,
            'eccLevel'   => QRCode::ECC_M,
            'scale'      => 6,
            'imageBase64' => false,
        ]);

        // Generate QR code as PNG
        $qrcode = new QRCode($options);
        $qrCodeImage = $qrcode->render($qrUrl);

        // Define storage path
        $filename = "qrcode_{$code}.png";
        $directory = 'qrcodes';
        $path = $directory . '/' . $filename;

        // Ensure directory exists
        Storage::disk('public')->makeDirectory($directory);

        // Save QR code to storage
        Storage::disk('public')->put($path, $qrCodeImage);

        return $path;
    }
}
