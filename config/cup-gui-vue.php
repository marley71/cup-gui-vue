<?php

return [
    'services' => [
        Marley71\CupSocketServer\WebSockets\SystemService::class //classi che espletano servizi websocket
    ],
    'cupparis_primevue_path' => env('VUEAPP_CUPPARIS_PRIMEVUE',resource_path('cupparis-primevue')), // path dove vogliamo venga installata la cupparis-primevue
    'env' => [
        'local' => [  // crea il file env per vite .env.local
            "VITE_APP_USE_API"=>1,
            "VITE_APP_DINAMIC_CONF"=>"/data/dynamic-conf.json",
            "VITE_APP_DEV_MENU"=>1,
            "VITE_API_MENU"=>"/api/app-menu",
            "VITE_WEBSOCKET_SERVER"=>env('APP_URL','localhost') . ':' . env('WEB_SOCKET_PORT'),
            "VITE_WEB_SOCKET_SERVICES"=>"system",   // servizi da utilizzare un sottoinsieme dei services definiti sopra
            "VITE_MODE"=> "dev",
            "VITE_RESOURCES_PATH" => env('VUEAPP_RESOURCES_PATH',resource_path('vue-application')), // path dove ci saranno le risorse dell'applicazione
            "APP_TARGET"=> env('APP_URL'),
            "APP_URL" => env('APP_URL','localhost'),
            "APP_HOST"=> env('VUEAPP_HOST','0.0.0.0'), // url in ascolto del server npm vite
            "APP_PORT"=> env('VUEAPP_PORT','8001'),  // porta in ascolto del server npm vite
            "APP_RESOURCES_PATH" => env('VUEAPP_RESOURCES_PATH',resource_path('vue-application')), // path dove ci saranno le risorse dell'applicazione
            "APP_CUPPARIS_PRIMEVUE" => env('VUEAPP_CUPPARIS_PRIMEVUE',resource_path('cupparis-primevue')) // path dove si trova la libreria cupparis-primevue

        ],
        'production' => [ // crea il file env per vite .env.production
            "VITE_APP_USE_API"=>1,
            "VITE_APP_DINAMIC_CONF"=>"/data/dynamic-conf.json",
            "VITE_API_MENU"=>"/api/app-menu",
            "VITE_MODE"=>"prod",
            "VITE_APP_DEV_MENU"=>0,
            "VITE_RESOURCES_PATH" => env('VUEAPP_RESOURCES_PATH',resource_path('vue-application')), // path dove ci saranno le risorse dell'applicazione

        ]
    ]

];
