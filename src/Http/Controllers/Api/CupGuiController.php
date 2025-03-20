<?php

namespace Marley71\CupSocketServer\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Spatie\Permission\Models\Role;

class CupGuiController extends Controller
{

    public function getPermessi(Request $request,$role) {
        $role = Role::findByName($role);
        $permissions = $role->permissions;
        $models = [];
        foreach ($permissions as $permission) {
            list($permmesso,$modelName) = explode(' ',$permission->name);
            if (!Arr::get($models,$modelName)) {
                $models[$modelName] = [];
            }
            $models[$modelName][] = $permmesso;
        }
        $json = [
            'error' => 0,
            'msg' => '',
            'permissions_flat' => $permissions->toArray(),
            'permissions' => $models,
        ];
        return response()->json($json);
    }
}
