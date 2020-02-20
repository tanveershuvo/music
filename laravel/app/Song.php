<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected   $table = "songs",
                $primaryKey = "id",
                $fillable = [
                    "name", "tags"
                ];
    
    public function getTagsAttribute($tags){
        return explode(",", $tags);
    }

    public function setTagsAttribute($tags){
        $this->attributes["tags"] = implode(",", $tags);
    } 
}
