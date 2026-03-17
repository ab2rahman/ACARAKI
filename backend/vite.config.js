import { defineConfig } from "vite";
import laravel, { refreshPaths } from "laravel-vite-plugin";

export default defineConfig({
    server: {
        port: 5181,
      },
    plugins: [
        laravel({
            input: [
                'resources/css/slick.css',
                "resources/scss/app.scss", 
                "resources/js/app.js",
                "resources/js/map.js",
                "resources/js/components.js",
                "resources/css/filament/admin/theme.css"
            ],
            refresh: [
                ...refreshPaths,
                "app/Filament/**",
                "app/Forms/Components/**",
                "app/Livewire/**",
                "app/Infolists/Components/**",
                "app/Providers/Filament/**",
                "app/Tables/Columns/**",
            ],
        }),
    ],
});
