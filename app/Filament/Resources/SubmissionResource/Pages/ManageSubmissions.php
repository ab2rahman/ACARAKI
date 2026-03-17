<?php

namespace App\Filament\Resources\SubmissionResource\Pages;

use App\Filament\Resources\SubmissionResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;
use Illuminate\Database\Eloquent\Builder;

class ManageSubmissions extends ManageRecords
{
    protected static string $resource = SubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }

    protected function getTableQuery(): Builder
    {
        $query = parent::getTableQuery();
        
        // Get the event_id from the URL parameter if present
        if (request()->has('tableFilters') && isset(request()->tableFilters['event_id']['value'])) {
            $eventId = request()->tableFilters['event_id']['value'];
            $query->where('event_id', $eventId);
        }
        
        return $query;
    }
}
