<?php

// use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Http\Controllers\TodoController;
Route::inertia('/', 'Pages/Home');

Route::get('/',[TodoController::class, 'show']);
Route::post('/',[TodoController::class, 'create']);
Route::put('/edit/{id}',[TodoController::class, 'edit'])->name('todos.edit');

Route::delete('/delete/{id}',[TodoController::class, 'delete'])->name('todos.delete'); // el atributo name funciona como un as 'nombre de la ruta'
Route::get('/{id}',[TodoController::class, 'showId']);