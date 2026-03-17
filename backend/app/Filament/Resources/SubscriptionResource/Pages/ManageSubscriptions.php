<?php

namespace App\Filament\Resources\SubscriptionResource\Pages;

use App\Filament\Resources\SubscriptionResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;
use pxlrbt\FilamentExcel\Actions\Pages\ExportAction;
use pxlrbt\FilamentExcel\Exports\ExcelExport;
use pxlrbt\FilamentExcel\Columns\Column;


class ManageSubscriptions extends ManageRecords
{
    protected static string $resource = SubscriptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ExportAction::make()->exports([
                ExcelExport::make()->withColumns([
                    Column::make('email'),
                    Column::make('name'),
                    Column::make('phone'),
                    Column::make('created_at')
                        ->heading('Submission Date')
                        ->formatStateUsing(fn ($record) => $record->created_at->format('d-m-Y H:i')),
                ]),
            ])
            // Actions\CreateAction::make(),
        ];
    }
}
