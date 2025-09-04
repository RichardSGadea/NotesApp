<?php

use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;

Route::get('health', [NoteController::class, 'health']);

Route::apiResource('notes', NoteController::class);
