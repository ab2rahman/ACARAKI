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
        Schema::table('submissions', function (Blueprint $table) {
            $table->string('job_title')->nullable()->change();
            $table->string('age')->nullable()->change();
            $table->string('gender')->nullable()->change();
            $table->string('short_bio')->nullable()->change();
            $table->string('id_image')->nullable()->change();
            $table->string('file_1')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->string('job_title')->nullable(false)->change();
            $table->string('age')->nullable(false)->change();
            $table->string('gender')->nullable(false)->change();
            $table->string('short_bio')->nullable(false)->change();
            $table->string('id_image')->nullable(false)->change();
            $table->string('file_1')->nullable(false)->change();
        });
    }
};
