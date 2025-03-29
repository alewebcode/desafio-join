<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryProduct extends Model
{
    protected $table = 'tb_categoria_produto';
    protected $primaryKey = 'id_categoria_planejamento';
    protected $fillable = ['nome_categoria'];

    public $timestamps = false;

    public function products()
    {
        return $this->hasMany(Product::class, 'id_categoria_produto');
    }
}
