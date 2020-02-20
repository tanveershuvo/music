<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        return response()->json(auth()->user(), 200);
    }
}
