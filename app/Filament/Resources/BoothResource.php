<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BoothResource\Pages;
use App\Filament\Resources\BoothResource\RelationManagers;
use App\Models\Booth;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BoothResource extends Resource
{
    protected static ?string $model = Booth::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\DatePicker::make('date')
                    ->required(),

                // Show code and QR info only on edit
                Forms\Components\Section::make('Generated Information')
                    ->schema([
                        Forms\Components\TextInput::make('code')
                            ->disabled()
                            ->dehydrated(false)
                            ->visible(fn ($operation) => $operation === 'edit'),
                        Forms\Components\FileUpload::make('qrcode_image')
                            ->downloadable(true)
                            ->disabled()
                            ->dehydrated(false)
                            ->visible(fn ($operation) => $operation === 'edit'),
                    ])
                    ->visible(fn ($operation) => $operation === 'edit')
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\Action::make('viewQR')
                    ->action(function (Booth $record) {
                        return response()->download(storage_path('app/public/' . $record->qrcode_image));
                    })
                    ->label('Download QR')
                    ->icon('heroicon-m-qr-code')
                    ->color('info'),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBooths::route('/'),
            'create' => Pages\CreateBooth::route('/create'),
            'edit' => Pages\EditBooth::route('/{record}/edit'),
        ];
    }
}
