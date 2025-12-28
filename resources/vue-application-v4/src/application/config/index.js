import recordLayouts from './recordLayouts'
import baseView from './baseView'
import listView from './listView'
import recordView from './recordView'

export default {
    install(viewsConfs) {
        let rl = viewsConfs.recordLayouts();
        let rlapp = recordLayouts();
        viewsConfs.recordLayouts = function () {
            return Object.assign(rl,rlapp);
        } 

        let bv = viewsConfs.baseView();
        let bvapp = baseView();
        viewsConfs.baseView = function () {
            return Object.assign(bv,bvapp);
        }

        let rv =  viewsConfs.recordView();
        let rvapp = recordView();
        viewsConfs.recordView = function () {
            return Object.assign(rv,rvapp);
        }

        let lv = viewsConfs.listView();
        let lvapp = listView();
        viewsConfs.listView = function () {
            return Object.assign(lv,lvapp);
        }
        return viewsConfs;
    }
}
