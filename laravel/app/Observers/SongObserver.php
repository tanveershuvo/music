<?php

namespace App\Observers;

use App\Song;

class SongObserver
{
    /**
     * Handle the song "created" event.
     *
     * @param  \App\Song  $song
     * @return void
     */
    public function created(Song $song)
    {
        // Increase the number of user songs by 1
        $this->addNumber(+1);

    }

    /**
     * Handle the song "updated" event.
     *
     * @param  \App\Song  $song
     * @return void
     */
    public function updated(Song $song)
    {
        //
    }

    /**
     * Handle the song "deleted" event.
     *
     * @param  \App\Song  $song
     * @return void
     */
    public function deleted(Song $song)
    {
        // Decrease the number of user songs by 1
        $this->addNumber(-1);
    }

    /**
     * Handle the song "restored" event.
     *
     * @param  \App\Song  $song
     * @return void
     */
    public function restored(Song $song)
    {
        //
    }

    /**
     * Handle the song "force deleted" event.
     *
     * @param  \App\Song  $song
     * @return void
     */
    public function forceDeleted(Song $song)
    {
        //
    }

    /**
     * Increase the number of songs to authenticated user
     */
    public function addNumber($number = 0){

        $user = auth()->user(); // Authenticated user

        $user->songs_number += $number;

        // Save changes
        $user->save();
    }

}
