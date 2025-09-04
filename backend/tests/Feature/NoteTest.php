<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Note;

class NoteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_create_note()
    {
        $response = $this->postJson('/api/notes', [
            'title' => 'Test Note',
            'content' => 'Contenido de prueba'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['data' => ['id', 'title', 'content', 'created_at', 'updated_at']]);

        $this->assertDatabaseHas('notes', [
            'title' => 'Test Note',
            'content' => 'Contenido de prueba'
        ]);
    }

    /** @test */
    public function title_is_required()
    {
        $response = $this->postJson('/api/notes', [
            'title' => '',
            'content' => 'Contenido sin título'
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title']);
    }
}
