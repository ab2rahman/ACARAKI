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
        Schema::table('activities', function (Blueprint $table) {
            $table->foreignId('festival_id')->constrained('festivals')->onDelete('cascade')->after('member_id');
        });
        // member id and festival id are unique together
        Schema::table('activities', function (Blueprint $table) {
            $table->unique(['member_id', 'festival_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropForeign(['festival_id']);
            $table->dropColumn('festival_id');
        });
    }
};
