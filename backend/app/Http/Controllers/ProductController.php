<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Product;

class ProductController extends Controller {

    public function index(){

        $products = Product::with('category')->get()->map(function ($product) {
            return [
                'id' => $product->id_produto,
                'product_name' => $product->nome_produto,
                'product_value' => $product->valor_produto,
                'category' => $product->category ? $product->category->nome_categoria : null,
                'registration_date' => Carbon::parse($product->data_cadastro)->format('d/m/Y H:i:s')
            ];
        });


        return response()->json([
            'products' => $products
        ],200);
    }

    public function store(Request $request){
        try{

            $validated = $request->validate([
                'category_id' => 'required|integer',
                'product_name' => 'required|string|max:150',
                'product_value' => 'required|string',
            ]);
            
            Product::create([
                'id_categoria_produto' => $validated['category_id'],
                'data_cadastro' =>  Carbon::now(),
                'nome_produto' => $validated['product_name'],
                'valor_produto' => $validated['product_value'],
            ]);

        }catch(\Exception $e){
          
            return response()->json([
                'message' => "Erro ao salvar"
            ],500);
        }
    }

    public function show($id){
        $product = Product::find($id);

        if(!$product){
            return response()->json([
                'message' => 'Produto não encontrado'
            ],404);
        }

        return [
            'id' => $product->id_produto,
            'product_name' => $product->nome_produto,
            'product_value' => floatval($product->valor_produto),
            'category_id' => $product->id_categoria_produto,
        ];
       
    }

    public function update(Request $request,$id){
        try {

        
        $product = Product::find($id);

        if(!$product){
            return response()->json([
                'message' => 'Produto não encontrado'
            ],404);
        }

        $validated = $request->validate([
            'category_id' => 'required|integer',
            'product_name' => 'required|string|max:150',
            'product_value' => 'required|string',
        ]);
       
       
        $product->id_categoria_produto =  $validated['category_id'];
        $product->nome_produto = $validated['product_name'];
        $product->valor_produto =  $validated['product_value'];

        $product->save();

        }catch(\Exception $e){
            return response()->json([
                'message' => "Erro ao salvar"
            ],500);
        }
        
    }

    public function destroy($id){
        $product = Product::find($id);

        if(!$product){
            return response()->json([
                'message' => 'Produto não encontrada'
            ],404);
        }

        $product->delete();

    }


   
}