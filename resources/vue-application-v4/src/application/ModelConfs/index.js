/**
* file autogenerato per importare tutti i modelli js necessari all'applicazione vue frontend
* viene generato utilizzando il file models.json per importare tutti i modelli necessari
**/

import cs from 'cupparis-primevue';

//IMPORT START
import ModelCupparisEntity from './ModelCupparisEntity.js';
import ModelUser from './ModelUser.js';
import ModelRoles from './ModelRoles.js';
import ModelQueue from './ModelQueue.js';
//IMPORT END

//INSTALL START
cs.CrudVars.modelConfs.ModelCupparisEntity = ModelCupparisEntity;
cs.CrudVars.modelConfs.ModelUser = ModelUser;
cs.CrudVars.modelConfs.ModelRoles = ModelRoles;
cs.CrudVars.modelConfs.ModelQueue = ModelQueue;
//INSTALL END   
