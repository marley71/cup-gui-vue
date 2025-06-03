<template>
    <div class="bg-red-50">
        <div class="layout-main">
            <div class="layout-content">
                <div class="card flex-column align-content-center align-items-center  bg-red-50">
                    <h1 class="text-center">Errore Generale</h1>
                    <h5 class="text-center">{{appStatusObject.errorMessage}}</h5>
                    <h5 class="text-center">{{appStatusObject.errorIssue}}</h5>
                </div>
            </div>
        </div>
        <div class="layout-content-mask"></div>
    </div>
</template>
<script>
import EventBus from './event-bus';
import cs from 'cupparis-primevue';
import {appStatus} from '@/application/stores/appStatus';
export default {
  mounted() {
      //console.debug('appStatus',this.appStatusObject);
      if (! this.appStatusObject.error) {
          this.$router.push('/');
      }
  },
  data() {
        return {
            appStatusObject : appStatus()
        }
  },
};
</script>
