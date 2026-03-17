<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SubmissionResource\Pages;
use App\Filament\Resources\SubmissionResource\RelationManagers;
use App\Models\Submission;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SubmissionResource extends Resource
{
    protected static ?string $model = Submission::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    
    protected static bool $shouldRegisterNavigation = false;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('event_id')
                    ->label('Event')
                    ->options(Event::pluck('title', 'id'))
                    ->searchable()
                    ->required(),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('phone')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('job_title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('age')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('gender')
                    ->options([
                        'male' => 'Male',
                        'female' => 'Female',
                    ])
                    ->required(),
                Forms\Components\Textarea::make('short_bio')
                    ->required()
                    ->maxLength(255),
                Forms\Components\FileUpload::make('id_image')
                    ->label('CV / Biodata / Portofolio')
                    ->required()
                    ->downloadable()
                    ->maxSize(5120),
                Forms\Components\FileUpload::make('file_1')
                    ->label('File #1')
                    ->required()
                    ->downloadable()
                    ->maxSize(5120),
                Forms\Components\FileUpload::make('file_2')
                    ->label('File #2')
                    ->required()
                    ->downloadable()
                    ->maxSize(5120),
                Forms\Components\FileUpload::make('file_3')
                    ->label('File #3')
                    ->required()
                    ->downloadable()
                    ->maxSize(5120),
                Forms\Components\FileUpload::make('file_4')
                    ->label('File #4')
                    ->required()
                    ->downloadable()
                    ->maxSize(5120),
                Forms\Components\FileUpload::make('file_5')
                    ->label('File #5')
                    ->required()
                    ->downloadable()
                    ->maxSize(5120),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('event.title')
                    ->label('Event')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('phone'),
                Tables\Columns\TextColumn::make('job_title'),
            ])
            ->filters([
                SelectFilter::make('event_id')
                    ->label('Event')
                    ->options(Event::pluck('title', 'id'))
                    ->searchable(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageSubmissions::route('/'),
            // 'view' => Pages\ViewSubmission::route('/{record}'),
        ];
    }
}
