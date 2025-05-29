import cs from 'cupparis-primevue';
import ModelUser from './ModelUser.js';
import ModelUser2 from './ModelUser2.js';
import DCupGeoComune from './DCupGeoComune.js';


export default {
    install() {
        cs.CrudVars.modelConfs.ModelUser = ModelUser;
cs.CrudVars.modelConfs.ModelUser2 = ModelUser2;
cs.CrudVars.modelConfs.DCupGeoComune = DCupGeoComune;

    }
}
