<template>
    <Card>
        <template #title>
            Profilo
        </template>
        <template #content>
<!--            <v-view :conf="confProfilo"></v-view>-->
            <div class="grid grid-cols-12 gap-2" >
                <template v-for="(field,name) in userData">
                    <template v-if="visibleFields.indexOf(name) >= 0">
                        <template v-if="name == 'mainrole'">
                            <div class="col-span-3">{{name}}</div>
                            <div class="col-span-8">{{field.name}}</div>
                        </template>
                        <template v-else-if="['created_at','updated_at'].indexOf(name) >= 0">
                            <div class="col-span-3">{{name}}</div>
                            <div class="col-span-8">{{cupparis.CrudHelpers.dateFormat(field)}}</div>
                        </template>
                        <template v-else>
                            <div class="col-span-3">{{name}}</div>
                            <div class="col-span-8">{{field}}</div>
                        </template>
                    </template>

                </template>
            </div>
            <div class="flex">
                <Button class="p-button-outlined p-button-sm" label="modifica password" @click="modifaPassordVisibile=true"></Button>
            </div>
            <Dialog :visible="modifaPassordVisibile" class="w-1/3 h-50vh" v-model:visible="modifaPassordVisibile">
                <template #header>
                    <div>Aggiorna Password</div>
                </template>
                <v-edit :conf="confPassword"></v-edit>
<!--                <template #footer>-->
<!--                    <Button class="p-button-outlined p-button-sm p-button-secondary" label="Annulla" @click="dialogNotaVisibile=false"></Button>-->
<!--                    <Button class="p-button-outlined p-button-sm" label="Salva" @click="salvaNota"></Button>-->
<!--                </template>-->
            </Dialog>
        </template>
    </Card>

</template>
<script setup>
import cupparis from 'cupparis-primevue'
import {ref,onMounted} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userData = ref({})
const visibleFields = ref(['name','email','mainrole','created_at','updated_at']);
const modifaPassordVisibile = ref(false);
const confPassword = {
    layout : {
        col : 1,
    },
    modelName : 'user',
    foormName : 'edit_password',
    fields : ['password','password_confirmation'],
    actions : ['action-save','action-annulla'],
    actionsConfig : {
        'action-save' : {
            afterExecute() {
                modifaPassordVisibile.value = false;
                router.push('/logout');
            }
        },
        'action-annulla': {
            text : 'Chiudi',
            execute() {
                modifaPassordVisibile.value = false;
            }
        }
    },
    fieldsConfig : {
        password : {
            type :'w-input',
            inputType:'password',
            rules : 'required|min:8',
        },
        password_confirmation : {
            type :'w-input',
            inputType: 'password',
            rules : 'required|passwordConfirmationRule|min:8',
            customRules : {
                passwordConfirmationRule() {
                    console.debug('params',arguments);
                    console.debug('this',this);
                    if (this.viewInstance.getWidget('password').getValue() != this.value) {
                        console.debug('passsord diverse')
                        return "password diverse";
                    }
                    console.debug('return true')
                    return true;
                }
            }
        },
    }
}

onMounted( () => {
    cupparis.Server.get('/api/me',{},(json) => {
        console.debug('json',json);
        userData.value = json
        confPassword.pk = userData.value.id;
        //userData.value.mainrole =
    })
})

</script>
