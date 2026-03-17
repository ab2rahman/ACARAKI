<?php

namespace App\Filament\Resources\GalleryResource\RelationManagers;

use App\Services\ImageOptimizationService;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Http\UploadedFile;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    protected static ?string $title = 'Gallery Images';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('image_path')
                    ->label('Gallery Images')
                    ->image()
                    ->multiple()
                    ->required()
                    ->disk('public')
                    ->directory('gallery-items')
                    ->imageEditor()
                    ->reorderable()
                    ->columnSpanFull()
                    // Image optimization settings
                    ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
                    ->maxSize(10 * 1024) // 10MB max file size
                    ->maxFiles(15) // Maximum 15 images at once for better performance
                    ->imageResizeMode('cover')
                    ->imageCropAspectRatio('1:1') // Square aspect ratio for gallery consistency
                    ->imageResizeTargetWidth('1200')
                    ->imageResizeTargetHeight('1200')
                    ->optimize('webp') // Convert to WebP for better compression
                    ->uploadProgressIndicatorPosition('center')
                    ->panelLayout('grid')
                    ->helperText('📸 Upload high-quality images (min. 500x500px, max. 10MB each). Images will be automatically optimized to WebP format, resized to 1200x1200px, and compressed for optimal web performance.')
                    ->hintIcon('heroicon-m-information-circle')
                    ->hint('Images are automatically optimized for web performance')
            ])
            ->columns(2);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('image_path')
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('Preview')
                    ->disk('public')
                    ->size(100)
                    ->circular(),
                
                Tables\Columns\IconColumn::make('is_cover')
                    ->label('Cover')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray'),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Uploaded')
                    ->dateTime('M j, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_cover')
                    ->label('Cover Image')
                    ->placeholder('All images')
                    ->trueLabel('Cover images only')
                    ->falseLabel('Non-cover images only'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->using(function (array $data) {
                        $gallery = $this->getOwnerRecord();
                        $imagePaths = $data['image_path'];
                        $createdItems = [];
                        
                        // If cover is set, unset other cover images
                        if ($data['is_cover'] ?? false) {
                            $gallery->items()->update(['is_cover' => false]);
                        }
                        
                        foreach ($imagePaths as $index => $imagePath) {
                            $itemData = [
                                'gallery_id' => $gallery->id,
                                'image_path' => $imagePath,
                                'is_cover' => false,
                                'sort_order' => 0,
                            ];
                            
                            // Set first image as cover if this is the first set of images and cover wasn't explicitly set
                            if ($index === 0) {
                                if ($data['is_cover'] ?? false) {
                                    $itemData['is_cover'] = true;
                                } elseif (!$gallery->items()->exists()) {
                                    $itemData['is_cover'] = true;
                                }
                            }
                            
                            $createdItems[] = $gallery->items()->create($itemData);
                        }
                        
                        return $createdItems[0] ?? null; // Return first item for redirect
                    }),
            ])
            ->actions([
                Tables\Actions\Action::make('set_cover')
                    ->label('Set as Cover')
                    ->icon('heroicon-o-star')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->action(function ($record) {
                        // Unset all other cover images for this gallery
                        $record->gallery->items()->update(['is_cover' => false]);
                        // Set this image as cover
                        $record->update(['is_cover' => true]);
                    })
                    ->visible(fn ($record) => !$record->is_cover),
                    
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->reorderable('sort_order');
    }
}
