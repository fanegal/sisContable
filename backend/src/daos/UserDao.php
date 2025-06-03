<?php
namespace App\Daos;

use App\Models\User;

class UserDao {
    public function findAll() {
        return User::all();
    }

    public function findById( $id ) {
        return User::find( $id );
    }

    public function create( array $data ) {
        return User::create( $data );
    }

    public function findUser( string $email, string $password ): ?User {
        $user = User::where( 'username', $email )->first();
        //xdebug_break();
        if ( !$user ) {
            return null;
        }

        if ( !password_verify( $password, $user->password ) ) {
            return null;
        }

        return $user;
    }
}