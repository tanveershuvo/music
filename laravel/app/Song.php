<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Song extends Model
{

    use Searchable;
    protected $appends = ['createdAtHuman'];
    
    protected   $table = "songs",
        $primaryKey = "id",
        $fillable = [
            "name", "tags"
        ];

    public function getTagsAttribute($tags)
    {
        return explode(",", $tags);
    }

    public function setTagsAttribute($tags)
    {
        $this->attributes["tags"] = implode(",", $tags);
    }

    public function getCreatedAtHumanAttribute()
    {
        return $this->created_at->diffForHumans();
    }


    public function user()
    {
        return $this->belongsTo("App\User", "user_id", "id");
    }
}
