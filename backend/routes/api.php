<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryProductController;
use App\Http\Controllers\ProductController;

//Categories
Route::post('categories', [CategoryProductController::class, 'store']);
Route::get('categories', [CategoryProductController::class, 'index']);
Route::get('categories/{id}', [CategoryProductController::class, 'show']);
Route::put('categories/{id}', [CategoryProductController::class, 'update']);
Route::delete('categories/{id}', [CategoryProductController::class, 'destroy']);

//Products
Route::post('products', [ProductController::class, 'store']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::put('products/{id}', [ProductController::class, 'update']);
Route::delete('products/{id}', [ProductController::class, 'destroy']);