INCLUDE_DIR="../../resources/views/roma-vue/includes"
AUTH_DIR="../../resources/views/roma-vue/auth"
DASHBOARD="../../resources/views/roma-vue/dashboard.blade.php"
LOGINBLADE=${AUTH_DIR}/login.blade.php
HEADBLADE=${INCLUDE_DIR}/head.blade.php
HTML_SOURCE="./dist/index.html"
HTML_LOGIN=${AUTH_DIR}/"login.vue.html"

mkdir -p ${INCLUDE_DIR}

echo "------------  build application in  ${INCLUDE_DIR} ---------------"
npm run build

echo "------------  generazione HEAD blade ------------"
echo "<head>\n" > ${HEADBLADE}
echo "<meta name=\"bearer-token\" content=\"{{Session::get('sanctum_token')}}\">\n" >> ${HEADBLADE}
echo "<meta name=\"csrf-token\" content=\"{{csrf_token()}}\">\n" >> ${HEADBLADE}
#prendo il contenuto dentro i tag <head></head> e lo inserisco nell'header blade
tr "\n" "|" < ${HTML_SOURCE} | grep -o '<head>.*</head>' | sed 's/\(<head>\|<\/head>\)//g;s/|/\n/g' >> ${HEADBLADE}
echo "</head>\n" >> ${HEADBLADE}


echo "------------  generazione LOGIN blade ------------"
echo "@extends('app')\n" > ${LOGINBLADE}
echo "@section('content')\n" >> ${LOGINBLADE}
#sed -n 's/.*<template-production>\(.*\)<\/template-production>.*/\1/p' ${VUE_LOGIN} >> ${LOGINBLADE}
#awk -v RS="</template-production>" -v ORS="" '/<template-production>/{print substr($0, index($0, ">") + 1)}' ${VUE_LOGIN} >> ${LOGINBLADE}
#tr "\n" "|" < ${VUE_LOGIN} | grep -o '<template-production>.*</template-production>' | sed 's/\(<template-production>\|<\/template-production>\)//g;s/|/\n/g' >> ${LOGINBLADE}
#cat ${VUE_LOGIN} >> ${LOGINBLADE}
echo "@endsection\n" >> ${LOGINBLADE}


echo "------------  generazione DASHBOARD blade ------------"
echo "@extends('app')\n" > ${DASHBOARD}
echo "@section('content')\n" >> ${DASHBOARD}
tr "\n" "|" < ${HTML_SOURCE} | grep -o '<body>.*</body>' | sed 's/\(<body>\|<\/body>\)//g;s/|/\n/g' >> ${DASHBOARD}
echo "@endsection\n" >> ${DASHBOARD}

echo "------------  copia dei file html statici ------------"
mkdir -p dist/data/html-template
cp ./src/application/assets/html-template/*.html dist/data/html-template

echo "------------  sincronize public application ------------"
rsync -zvrah dist/* ../../public/roma-vue/
