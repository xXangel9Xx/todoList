<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Todo;
class TodoController extends Controller
{
    public function show(){
        return Inertia::render('Home',['todos'=>Todo::all(), 'todo'=> new Todo()]);
    }
    public function showId($id){
        return response()->json(Todo::get($id));
    }
    public function delete($id){
        Todo::destroy($id);
        return redirect('/');
    }
    public function edit($id,Request $request){
        $todo = Todo::find($id);
        $todo -> title= $request->input('title');
        $todo -> text= $request->input('text');
        $todo->save();
        return Inertia::render('Home',['todos'=>Todo::all()]);
    }
    public function create(Request $request){
        $todo = new Todo();
        $todo -> title=$request->input('title');
        $todo -> text=$request->input('text');
        $todo->save();
        return Inertia::render('Home',['todos'=>Todo::all()]);
    }
}
