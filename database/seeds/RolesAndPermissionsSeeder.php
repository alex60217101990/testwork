<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        DB::table('roles')->delete();
        DB::table('permissions')->delete();
        DB::table('role_has_permissions')->delete();
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // create permissions
        Permission::create(['name' => 'admin panel update']);
        Permission::create(['name' => 'update cities']);
        Permission::create(['name' => 'delete cities']);
        Permission::create(['name' => 'admin']);

        // create roles and assign existing permissions
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(['admin panel update','admin']);

        $role = Role::create(['name' => 'base user']);
        $role->givePermissionTo(['update cities', 'delete cities']);
    }
}
