export default function() {
    return {
        //name: '',
        //value: null,
        //fields: null,
        //type: 'v-list',
        //extraBind: {},
        recordActionsPosition: 'start',
        actionsRecordLayout: 'buttons',
        // title: '',
        // headerHelp: '',
        // orderFields: {},
        // paginator: true,
        // paginatorPosition: 'both',
        // rows: 20,
        // loaded: false,
        // route: null,
        // routeName: null,
        // defaultWidgetType: 'w-text',
        // fieldsConfig: {},
        // actionsConfig: {},
        // metadata: {},
        // pagination: {},
        // selectionMode: 'multiple',
        // autoload: true,
        
        // actionsLayout: 'simple',
        // actionsLayoutTitle: '',
        // actionRecordLayout: 'simple',
        // actionRecordLayoutTitle: '',
        // blocked: false,
        // modelName: null,
        // hiddenColumns: [],
        // //numeroRecordsLabel : null, // label del numero dei records
        /**
         * esempio di metodo visibile a tutte le liste
         * @returns 
         */
        getAuth() {
            try {
                return this.json.app.auth;
            } catch (error) {
                console.error(error);
                return {};
            }
            
        }
    }
}
