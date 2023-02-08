<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Transfer;

class Wallet extends Model
{
    use HasFactory;

    public function transfers(){
        return $this->hasMany(Transfer::class);
    }
}
