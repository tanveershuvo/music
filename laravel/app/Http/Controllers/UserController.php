<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Create a new user instance after a valid registration.
     */
    public function register(Request $request){

        $results = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if($results->fails()){
            return response()->json([
                "errors"    => $results->errors(),
            ], 401);
        }

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $user->save();

        return response()->json([
            "success"   => true
        ], 201);
    }


    /**
     * Return authenticated user data
     */
    public function me(){
        $user = $this->picUrl(auth()->user());
        return response()->json($user, 200);
    }

    /**
     * Return user songs
     */
    public function songs($slug){

        try{
            $user = User::findBySlugOrFail($slug);

            $songs = $user->songs()->paginate(10);

            $songs->getCollection()->transform(function ($s) {
                return $this->songUrl($s);
            });

            return response()->json([
                "user"  => $user,
                "data"  => $songs
            ]);

        } catch(Exception $e) {
            return response()->json([
                "errors"    => [
                    "Not Found"
                ]
            ], 404);
        }
    }



    // Get the song public url
    protected function songUrl($song){
        $song->path = Storage::url($song->path);
        return $song;
    }


    /**
     * Update user settings
     */
    public function settings(Request $request){

        $user = auth()->user();
        
        $results = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'pic'   => 'nullable|image|max:2048'
        ]);

        if($results->fails()){
            return response()->json([
                "errors" => $results->errors()
            ], 400);
        }

        // Check if the user uploaded new image
        $filePath = $user->pic;
        if($request->file("pic")){
            // Delete old picture
            Storage::delete($filePath);
            // UPload the picture
            $filePath = $request->file("pic")->store("public/pics");
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->pic = $filePath;
        
        $user->save();

        $user = $this->picUrl($user);

        return response()->json([
            "user"  => $user
        ]);

    }

    public function picUrl($user){
        if($user->pic){
            $user->pic = Storage::url($user->pic);
        }
        return $user;
    }


    /**
     * Change authintecated user password after validating the request
     */
    public function password(Request $request){
        
        $results = Validator::make($request->all(), [
            'old_password' => 'required|string',
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if($results->fails()){
            return response()->json([
                "errors" => $results->errors()
            ], 400);
        }

        // Validate old password
        $user = auth()->user();

        if(! Hash::check($request->old_password, $user->password)){
            return response()->json([
                "errors" => [
                    "Wrong Password"
                ]
            ], 400);
        }

        $user->password = Hash::make($request->password);

        $user->save();

        return response()->json([
            "success" => true
        ]);

    }

    /**
     * Return all users
     */
    public function users(){
        $users = User::paginate(10);

        return response()->json($users);
    }

}
