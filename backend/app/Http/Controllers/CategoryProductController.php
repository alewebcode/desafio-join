<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Models\CategoryProduct;

class CategoryProductController extends Controller {

    public function index(){

        $categories = CategoryProduct::all();

        return response()->json([
            'categories' => $categories
        ],200);
    }

    public function store(Request $request){
        try{

            $name = $request->name;

            CategoryProduct::create([
                'nome_categoria' => $name
            ]);

        }catch(\Exception $e){
           
            return response()->json([
                'message' => "Erro ao salvar"
            ],500);
        }
    }

    public function show($id){
        $category = CategoryProduct::find($id);

        if(!$category){
            return response()->json([
                'message' => 'Categoria não encontrada'
            ],404);
        }

        return $category;
    }

    public function update(Request $request,$id){
        $category = CategoryProduct::find($id);

        if(!$category){
            return response()->json([
                'message' => 'Categoria não encontrada'
            ],404);
        }

        $category->nome_categoria =  $request->name;
        $category->save();

        
    }

    public function destroy($id){
        $category = CategoryProduct::find($id);

        if(!$category){
            return response()->json([
                'message' => 'Categoria não encontrada'
            ],404);
        }

        $category->delete();

    }

   
}