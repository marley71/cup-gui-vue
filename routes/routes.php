<?php

use Illuminate\Support\Facades\Route;
Route::post('/api/cup-gui/permissions/{role}',  [Marley71\CupGuiVue\Http\Controllers\Api\CupGuiController::class, 'getPermessi']);
