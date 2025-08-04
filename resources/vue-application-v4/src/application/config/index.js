import recordLayout from './recordLayout'
import baseView from './baseView'
import listView from './listView'
import recordView from './recordView'

export default {
    install(viewsConfs) {
        viewsConfs.recordLayouts = recordLayout;
        viewsConfs.baseView = baseView;
        viewsConfs.recordView = recordView;
        viewsConfs.listView = listView;
        return viewsConfs;
    }
}
