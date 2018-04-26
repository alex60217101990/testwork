<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'AngularController@serve');
Route::post('/post', 'AngularController@post');
Route::get('/login', 'AngularController@serve');
Route::get('/other', 'AngularController@serve');
Route::post('/auth/register', 'AngularController@newUser');
Route::post('/resource/path', 'AngularController@getIcon');
Route::get('/users-list', 'AngularController@serve');
Route::get('/adminPanel/{id}', 'AngularController@serve');


Route::get('/pusher', function() {
    event(new App\Events\NewMessage('Pusher work!'));
    return "Event has been sent!";
});

/**
 * Authenticate.
 */
Route::group(['prefix' => 'auth', 'middleware' => ['web']], function() {
    Route::post('api/register', 'TokenAuthController@register');
    Route::post('api/authenticate', 'TokenAuthController@authenticate');
    Route::get('api/authenticate/user', 'TokenAuthController@getAuthenticatedUser');


    Route::post('data', 'AuthController@getData');
    Route::post('login', 'AuthController@login');
    Route::get('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');

});

/**
 * Content regulations.
 */
Route::group(['prefix' => 'content', 'middleware' => ['web']], function() {
    Route::post('getUsers', 'AuthController@getUsersList');
    Route::post('getCities', 'AuthController@getCitiesList');
    Route::post('deleteCity', 'AuthController@deleteCityAction');
    Route::post('soccet', 'AuthController@connect');
});

/**
 * Admin panel.
 */
Route::group(['prefix' => 'admin', 'middleware' => ['web']], function() {
    /*Methods Admin API.*/
    Route::post('backupUserRoles', 'AuthController@backupUserRoles');
});

