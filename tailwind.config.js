import preset from './vendor/filament/support/tailwind.config.preset'

export default {
  presets: [
    preset,
    require("./vendor/power-components/livewire-powergrid/tailwind.config.js"), 
  ],
  content: [
    './app/Filament/**/*.php',
    './resources/views/**/*.blade.php',
    './vendor/filament/**/*.blade.php',
    './app/Livewire/**/*Table.php',
    './app/Livewire/Table/Infrastructure/*.php',
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/power-components/livewire-powergrid/resources/views/**/*.php',
    './vendor/power-components/livewire-powergrid/src/Themes/Tailwind.php'
  ],
  theme: {
    screens: {
      xs: "425px",
      "small": "360px",
      sm: "640px",
      md: "700px",
      "md2": "820px",
      lg: "1000px",
      xl: "1025px",
      '1xl': "1100px",
      "2xl": "1280px",
      "3xl": "1366px",
      "4xl": "1536px",
      "5xl": "1920px",
    },
    extend: {
      fontFamily: {
        'albert': '"Albert Sans", sans-serif',
      },
      colors: {
        'kblbb-green': '#16824E',
        'kblbb-green-light': '#F0F8EE',
        'kblbb-red': '#C83212',
        'kblbb-blue': '#2A50B0',
        'kblbb-blue-darker': '#1B3883',
        'kblbb-bg': '#E9EFFB',
        'kblbb-text': '#021825',
        'kblbb-bg-icon': '#297D91',
        'kblbb-tag': '#547EBD',
        'kblbb-grey-1': '#666C73',
        'kblbb-grey-2': '#E8EAEE',
        'kblbb-grey-3': '#EAEEF4',
        'kblbb-grey-4': '#F6F8FA',
        'kblbb-bg-tag': '#547EBD21',
      },
      fontSize: {
        sm: ['.875rem', '1.375rem'],
        xss: ['.625rem', '.875rem'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
