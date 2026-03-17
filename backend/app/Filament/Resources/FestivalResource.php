<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FestivalResource\Pages;
use App\Filament\Resources\FestivalResource\RelationManagers;
use App\Models\Festival;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Enums\FontWeight;
use Illuminate\Support\Facades\Storage;

class FestivalResource extends Resource
{
    protected static ?string $model = Festival::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';
    
    protected static ?string $navigationLabel = 'Festivals';
    
    protected static ?string $modelLabel = 'Festival';
    
    protected static ?string $pluralModelLabel = 'Festivals';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\DatePicker::make('date')
                            ->required()
                            ->native(false),
                        Forms\Components\TextInput::make('location')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('ticket_url')
                            ->maxLength(255)
                            ->url(),
                    ])->columns(2),

                Forms\Components\Section::make('Ticket Details')
                    ->schema([
                        Forms\Components\TextInput::make('ticket_title')
                            ->label('Title')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('ticket_lead')
                            ->label('Lead')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('sales_period')
                            ->label('Sales period')
                            ->maxLength(255),
                        Forms\Components\Repeater::make('tickets')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('subtitle')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('price')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('information')
                                    ->maxLength(500),
                                Forms\Components\TextInput::make('url')
                                    ->maxLength(255)
                                    ->columnSpanFull(),
                                Forms\Components\Repeater::make('packages')
                                    ->schema([
                                        Forms\Components\TextInput::make('item')
                                            ->maxLength(255),
                                    ])
                                    ->defaultItems(0)
                                    ->columns(1)
                                    ->collapsible(false),
                            ])
                            ->defaultItems(2)
                            ->addable(false)
                            ->deletable(false)
                            ->columns(2)
                            ->collapsible(),
                    ]),

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
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight(FontWeight::SemiBold),
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable()
                    ->badge()
                    ->color('success'),
                Tables\Columns\TextColumn::make('location')
                    ->searchable()
                    ->limit(30)
                    ->toggleable(),
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
            ])
            ->actions([
                Tables\Actions\Action::make('viewQR')
                    ->action(function (Festival $record) {
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
            ])
            ->defaultSort('created_at', 'desc');
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
            'index' => Pages\ListFestivals::route('/'),
            'create' => Pages\CreateFestival::route('/create'),
            'edit' => Pages\EditFestival::route('/{record}/edit'),
        ];
    }
}
