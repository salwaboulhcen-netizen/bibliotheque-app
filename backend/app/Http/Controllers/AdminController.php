<?php

namespace App\Http\Controllers;
use App\Models\Admin;
use Illuminate\Http\Request;


class AdminController extends Controller
{
    // GET all admins
    public function index()
    {
        return response()->json(Admin::all());
    }

    // POST create admin
    public function store(Request $request)
    {
        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json($admin);
    }
}

