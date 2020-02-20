<?php

namespace App\Http\Controllers;

use App\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use wapmorgan\Mp3Info\Mp3Info;

class SongController extends Controller
{

    public function __construct(){
        
        $this->middleware("auth:api")->only(["store", "update", "destroy"]);
        
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $songs = Song::paginate(10);

        return response()->json($songs, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request
        $results = Validator::make($request->all(), [
            "name"  => "required|max: 20|min: 3",
            "tags"  => "required|array|max:5",
            "tags.*" => "min:3|max:10",
            "song" => "required|file|mimes:mpga|max:8192",
        ]);

        if($results->fails()){
            return response()->json([
                'errors'    => $results->errors()
            ], 400);
        }

        // Upload the song
        $filePath = $request->song->store("public/songs");

        // Get file duration
        $duration = $this->getDuration($filePath);

        $song = new Song([
            "name"  => $request->name,
            "tags"  => $request->tags
        ]);

        $song->path = $filePath;
        $song->time = $duration;
        $song->user_id = auth()->user()->id;

        $song->save();

        return response()->json([
            "song" => $this->songUrl($song)
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function show(Song $song)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function edit(Song $song)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Song $song)
    {
        // Validate the request
        $results = Validator::make($request->all(), [
            "name"  => "required|max: 20|min: 3",
            "tags"  => "required|array|max:5",
            "tags.*" => "min:3|max:10",
            "song" => "nullable|file|mimes:mpga|max:8192",
        ]);

        if($results->fails()){
            return response()->json([
                'errors'    => $results->errors()
            ], 400);
        }


        // Check for authorization
        if(auth()->user()->id != $song->user_id){
            return response()->json([
                'errors'    => [
                    'unauthorized'
                ]
            ], 401);
        }


        // Check if there's a file
        
        $filePath = $song->path;
        $duration = $song->time;

        if($request->file("song")){
            // Delete old song
            Storage::delete($filePath);
            // UPload the song
            $filePath = $request->file("song")->store("public/songs");
            // Get file duration
            $duration = $this->getDuration($filePath);
        }


        $song->name = $request->name;
        $song->tags = $request->tags;
        $song->path = $filePath;
        $song->time = $duration;

        $song->save();

        return response()->json([
            "song" => $this->songUrl($song)
        ], 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function destroy(Song $song)
    {
        // Check for authorization
        if(auth()->user()->id != $song->user_id){
            return response()->json([
                'errors'    => [
                    'unauthorized'
                ]
            ], 401);
        }

        // Delete song file
        Storage::delete($song->path);

        // Delete song data
        $deleted = $song->delete();

        return response()->json([
            "deleted" => $deleted,
        ], 200);
    }

    // Get the song public url
    protected function songUrl(Song $song){
        $song->path = Storage::url($song->path);
        return $song;
    }

    /**
     * Get file path duration
     */
    protected function getDuration($filePath){
        $audio = new Mp3Info(Storage::disk("local")->path($filePath));
        $duration = floor($audio->duration / 60) . ":" . floor($audio->duration % 60);
        
        return $duration;
    }
    
}
