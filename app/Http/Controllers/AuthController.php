<?php

namespace App\Http\Controllers;

use App\citie;
//use Illuminate\Auth\Access\Gate;
use App\Events\NewMessage;
use App\Message;
use JWTAuth;
use Mockery\Exception;
use Psy\Util\Json;
use Pusher\Laravel\Facades\Pusher;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
/*For roles and permission used.*/
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use Gate;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{

    protected $roles;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if ($token = $this->guard()->attempt($credentials)) {
                if($this->guard()->user()->hasRole('admin'))
                // if no errors are encountered we can return a JWT
                    //use Pusher\Laravel\Facades\Pusher;

                return response()->json(compact('token'));
                else
                    return response()->json(['error' => 'you have no rights.'], 401);
            }else{
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        }
        catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
      //  return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }


    /**
     * Get all Users list.
     * @return Json
     * @param Request
     */
    public function getUsersList(Request $request){
        $user = new User;
        try {
         //   if(Gate::denies('getUsersInfo', $user))
            if(!$this->guard()->user()->hasRole('admin'))
              response()->json(['error' => 'You have no rights.'], 505);
            //$user = $this->guard()->user();
            $data = []; $counter = 1;
            foreach (User::all() as $User){
                $timeArr = [];
                $timeArr['user'] = $User;
                $timeArr['permissions'] = $User->getAllPermissions();
                $data[$counter++] = $timeArr;
            }
            return response()->json(['users' => $data]);
        }catch (\Exception $exception){
            return response()->json(['error_text' => $exception], 507);
        }
    }

    /**
     * Delete City.
     * @param Request
     * @return Json
     */
    public function deleteCityAction(Request $request){
        try {
            $city = new citie;
            $empty = citie::get();
        //    if (Gate::allows('deleteCity',  $city) && !$empty->isEmpty() && !empty($request->id)){
            if($this->guard()->user()->hasPermissionTo('delete cities')){
                citie::find($request->id)->delete();
                return response()->json(['congratulation' => $request->id]);
            }
            return response()->json(['error'=>'You have no rights.'], 505);
        }catch (\Exception $exception){
            return response()->json(['error'=>$exception->getMessage()],507);
        }
    }

    /**
     * Method for update user roles list.
     * @param Request $request
     * @return Json
     */
    public function backupUserRoles(Request $request){
        try{
            $data = []; $counter = 0;
            $user = User::where('id',$request->user_id)->first();
            foreach (json_decode($request->roles_list) as $role_user) {
                //$role = Role::findByName($role_user->name);
                $present = $user->hasRole($role_user->name);
                if(!$present) {
                    Role::create(['name' => $role_user->name]);
                    $user->assignRole($role_user->name);
                    array_push($data, $role_user->name);
                    $counter++;
                }
            }
            if($counter>0)
                return response()->json(['result'=>true]);
            return response()->json(['result'=>false]);
            /*['data'=>$request->roles_list[0]['name']]*/
        }catch (\Exception $exception){
            return response()->json(['error'=>$exception->getMessage()],502);
        }
    }


    public function connect(Request $request){
        try{
            Pusher::trigger('my-channel', 'my-event', ['1'=>'klbnlnlhynk']);
            $messages = Message::all();
            $data = [];
            try {
                foreach ($messages as $message) {
                    $data['user_id'] = $message->user_id;
                    $date['body_massage'] = $message->body_massage;
                    $data['created_at'] = $message->created_at;
                    $data['updated_at'] = $message->updated_at;
                }
            }catch (Exception $exception){};
            $data['message'] = $messages;
            Pusher::trigger('my-channel', 'my-event', ['a'=>879879]);
           // event(new NewMessage('Pusher work!'));
            return response()->json(['result'=>'success']);
        }catch (Exception $exception){
            return response()->json(['result'=>'error']);
        }
    }

}
