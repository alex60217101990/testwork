<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use App\users_role;
use File;
//use http\Env\Request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;
use Psy\Util\Json;
use Illuminate\Support\Facades\Hash;


use Pusher\Laravel\Facades\Pusher;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AngularController extends Controller
{
    /**
     * Serve the angular application.
     *
     * @return \Illuminate\View\View
     */
    public function serve()
    {
       // return File::get(public_path('dist/index.html'));
       /* try {
            $messages = Message::all();
            $data = [];
            foreach ($messages as $message) {
                $data['user_id'] = $message->user_id;
                $date['body_massage'] = $message->body_massage;
                $data['created_at'] = $message->created_at;
                $data['updated_at'] = $message->updated_at;
            }
            Pusher::trigger('my-channel', 'my-event', $data);
        }catch (Exception $e){}*/
        return File::get(public_path('dist/index.html'));
    }


    /**
     * Method Post.
     * @return Json
     */
    public function post(Request $request){
        $data = [['1'=>'fmmgbfkbnjgkbgnk', '2'=>1200],['3'=>'jnbjgbngkng','4'=>565156]];
        return json_encode($data);
    }

    /**
     * Register new User.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function newUser(Request $request){
        try {
          //  return json_encode(['register'=>true]);
       //     if ($request->ajax()) {
              //  $data = json_decode($request);
                if (isNonEmptyString($request->login) && isNonEmptyString($request->password) &&
                    isNonEmptyString($request->email)) {
                 /*   $user = new User;
                   // $user_role = new user_role;
                    $user->fill(['name'=>$request->login,'email'=>$request->email,'password'=>Hash::make($request->password)]);
                    $user->save();
                    users_role::create(['role_name'=>'baseUser','role_code'=>3,'user_id'=>$user->id]);*/

                  $user = User::create(['name'=>$request->login,'email'=>$request->email,'password'=>Hash::make($request->password)]);
                  $user->assignRole('admin');
                    //$user -> givePermissionTo ( 'admin panel update','update cities','delete cities','admin');
                   // User::orderBy('id', 'desc')->first()->assignRole('base user');
                    return json_encode(['register'=>true]);
                }
                return json_encode(['error' => 'Неполные данные', 'code' => 407]);
        //    }
        }catch (\Exception $exception){
            return json_encode(['error' => $exception->getMessage(), 'code' => 405]);
        }
    }


    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }


    public function getIcon(Request $request){
        $file_path = public_path() . '\img\\'.'exit.svg';
        return json_encode(['path' => $file_path]);
       // return File::get(public_path('img/exit.svg'));
    }
}
