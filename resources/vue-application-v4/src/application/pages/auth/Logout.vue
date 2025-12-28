<template>
    <ProgressSpinner />
</template>
<script>
import cupparis from 'cupparis-primevue'
import {userApp} from "../../stores/userApp";

if (import.meta.env.VITE_MODE == 'dev') {

    cupparis.Server.post('/api/logout',{},function(json) {
        userApp().reset();
        cupparis.CrudCore.setCache('token','');
        document.location.href='/';
    })
} else {
    userApp().reset();
    document.location.href='/logout';
}
</script>
