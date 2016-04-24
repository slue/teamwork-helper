<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Rossedman\Teamwork\Facades\Teamwork;
use JavaScript;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $projectlist = Cache::remember("project_list" . Auth::user()->id, 14400, function ()
        {
            // Use Auth Key of the User
            config(['services.teamwork.key' => Auth::user()->teamwork_auth_key]);

            $projectlist = array();
            $projects = Teamwork::project()->all()['projects'];
            foreach ($projects as $project)
            {
                $tasklists = Teamwork::project(intval($project['id']))->tasklists()['tasklists'];
                $task_mailaddress = null;
                foreach ($tasklists as $tasklist)
                {
                    if($tasklist['name'] === 'DEV')
                    {
                        if(!$task_mailaddress)
                        {
                            foreach (Teamwork::project(intval($project['id']))->emailAddress()["emailaddress"]["addresses"] as $address)
                            {
                                if(array_key_exists("tasks", $address))
                                {
                                    $task_mailaddress = $address["tasks"];
                                    $mail_components = explode("@", $task_mailaddress);
                                    $tasklist['mailaddress'] = $mail_components[0] . ".tl" . $tasklist['id'] . "@" . $mail_components[1];
                                }
                            }
                        }
                        $project_to_add = array();
                        $project_to_add['id'] = $project['id'];
                        $project_to_add['name'] = $project['name'];
                        $project_to_add['dev_tasklist_id'] = $tasklist['id'];
                        $project_to_add['dev_tasklist_email'] = $tasklist['mailaddress'];
                        $projectlist[] = $project_to_add;

                    }
                }
            }
            return $projectlist;
        });

        JavaScript::put([
//            "tasklists_json" => $tasklists['json'],
            "teamwork_auth_key" => base64_encode(Auth::user()->teamwork_auth_key),
            "project_list" => $projectlist
        ]);

        return view('home');
    }
}
