<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $query = Note::query();
        if ($request->q) {
            $query->where('title', 'like', "%{$request->q}%");
        }
        $notes = $query->orderByDesc('created_at')->paginate(10);
        return NoteResource::collection($notes);
    }

    public function store(NoteRequest $request)
    {
        $note = Note::create($request->validated());
        return new NoteResource($note);
    }

    public function show(Note $note)
    {
        return new NoteResource($note);
    }

    public function update(NoteRequest $request, Note $note)
    {
        $note->update($request->validated());
        return new NoteResource($note);
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function health()
    {
        try {
            \DB::connection()->getPdo();
            return response()->json(['db' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['db' => 'fail'], 500);
        }
    }
}
