<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Aquí puedes dejarlo vacío, las rutas se manejan en RouteServiceProvider
    }
}
