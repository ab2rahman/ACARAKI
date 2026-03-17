<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('festivals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('date');
            $table->string('location')->nullable();
            $table->string('ticket_url')->nullable();
            $table->string('ticket_title')->nullable();
            $table->string('ticket_lead')->nullable();
            $table->string('sales_period')->nullable();
            $table->json('tickets')->nullable();
            $table->string('code', 12)->unique();
            $table->string('qrcode_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('festivals');
    }
};
