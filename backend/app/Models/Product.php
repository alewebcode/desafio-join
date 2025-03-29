<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CategoryProduct;

class Product extends Model
{   
    protected $table = 'tb_produto';
    protected $primaryKey = 'id_produto';
    protected $fillable = ['id_categoria_produto','data_cadastro','nome_produto','valor_produto'];
    
    public $timestamps = false;


    public function category(){
        return $this->belongsTo(CategoryProduct::class, 'id_categoria_produto');
    }
}
