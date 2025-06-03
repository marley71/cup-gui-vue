import cupparisPrimevue from "cupparis-primevue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import AutoComplete from "primevue/autocomplete";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Badge from "primevue/badge";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Chart from "primevue/chart";
import Carousel from "primevue/carousel";
import Checkbox from "primevue/checkbox";
import Chip from "primevue/chip";
import Chips from "primevue/chips";
import ColorPicker from "primevue/colorpicker";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ContextMenu from "primevue/contextmenu";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import Fieldset from "primevue/fieldset";
import FileUpload from "primevue/fileupload";
import Galleria from "primevue/galleria";
import Image from "primevue/image";
import InlineMessage from "primevue/inlinemessage";
import Inplace from "primevue/inplace";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Knob from "primevue/knob";
import Listbox from "primevue/listbox";
import MegaMenu from "primevue/megamenu";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import MultiSelect from "primevue/multiselect";
import OrderList from "primevue/orderlist";
import OrganizationChart from "primevue/organizationchart";
import OverlayPanel from "primevue/overlaypanel";
import Paginator from "primevue/paginator";
import Panel from "primevue/panel";
import PanelMenu from "primevue/panelmenu";
import Password from "primevue/password";
import PickList from "primevue/picklist";
import ProgressBar from "primevue/progressbar";
import RadioButton from "primevue/radiobutton";
import Rating from "primevue/rating";
import SelectButton from "primevue/selectbutton";
import ScrollPanel from "primevue/scrollpanel";
import ScrollTop from "primevue/scrolltop";
import Slider from "primevue/slider";
import Sidebar from "primevue/sidebar";
import Skeleton from "primevue/skeleton";
import SpeedDial from "primevue/speeddial";
import SplitButton from "primevue/splitbutton";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Steps from "primevue/steps";
import TabMenu from "primevue/tabmenu";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";
import TieredMenu from "primevue/tieredmenu";
import Timeline from "primevue/timeline";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";
import ToggleButton from "primevue/togglebutton";
import Tree from "primevue/tree";
import TreeSelect from "primevue/treeselect";
import TreeTable from "primevue/treetable";
import TriStateCheckbox from "primevue/tristatecheckbox";
import CodeHighlight from '../components/AppCodeHighlight';
import BlockViewer from '../components/BlockViewer.vue';
import Tooltip from "primevue/tooltip";
import Ripple from "primevue/ripple";
import BadgeDirective from "primevue/badgedirective";
import StyleClass from "primevue/styleclass";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import router from "../router";



export default {
    setup(app) {
        _setupComponents();
        _setupDirectives();
        _setupUses();
        app.config.globalProperties.$toast = ToastService;
        cupparisPrimevue.CrudCore.setupApp(app);
    },
}

function _setupComponents() {
    cupparisPrimevue.CrudCore.componentItems = Object.assign(cupparisPrimevue.CrudCore.componentItems,{
        'CodeHighlight' : CodeHighlight,
        'BlockViewer' : BlockViewer,

        'Accordion' : Accordion,
        'AccordionTab' : AccordionTab,
        'AutoComplete' : AutoComplete,
        'Avatar' : Avatar,
        'AvatarGroup' : AvatarGroup,
        'Badge' : Badge,
        //'BlockUI' : BlockUI,
        'Breadcrumb' : Breadcrumb,
        'Button' : Button,
        'Calendar' : Calendar,
        'Card' : Card,
        'Chart' : Chart,
        'Carousel' : Carousel,
        //'CascadeSelect' : CascadeSelect,
        'Checkbox' : Checkbox,
        'Chip' : Chip,
        'Chips' : Chips,
        'ColorPicker' : ColorPicker,
        'Column' : Column,
        //'ColumnGroup' : ColumnGroup,
        'ConfirmDialog' : ConfirmDialog,
        'ConfirmPopup' : ConfirmPopup,
        'ContextMenu' : ContextMenu,
        'DataTable' : DataTable,
        'DataView' : DataView,
        'DataViewLayoutOptions' : DataViewLayoutOptions,
        //'DeferredContent' : DeferredContent,
        'Dialog' : Dialog,
        'Divider' : Divider,
        //'Dock' : Dock,
        'Dropdown' : Dropdown,
        //'DynamicDialog' : DynamicDialog,
        'Editor' : Editor,
        'Fieldset' : Fieldset,
        'FileUpload' : FileUpload,
        'Galleria' : Galleria,
        'Image' : Image,
        'InlineMessage' : InlineMessage,
        'Inplace' : Inplace,
        'InputMask' : InputMask,
        'InputNumber' : InputNumber,
        'InputSwitch' : InputSwitch,
        'InputText' : InputText,
        'Knob' : Knob,
        'Listbox' : Listbox,
        'MegaMenu' : MegaMenu,
        'Menu' : Menu,
        'Menubar' : Menubar,
        'Message' : Message,
        'MultiSelect' : MultiSelect,
        'OrderList' : OrderList,
        'OrganizationChart' : OrganizationChart,
        'OverlayPanel' : OverlayPanel,
        'Paginator' : Paginator,
        'Panel' : Panel,
        'PanelMenu' : PanelMenu,
        'Password' : Password,
        'PickList' : PickList,
        'ProgressBar' : ProgressBar,
        //'ProgressSpinner' : ProgressSpinner,
        'RadioButton' : RadioButton,
        'Rating' : Rating,
        //'Row' : Row,
        'SelectButton' : SelectButton,
        'ScrollPanel' : ScrollPanel,
        'ScrollTop' : ScrollTop,
        'Slider' : Slider,
        'Sidebar' : Sidebar,
        'Skeleton' : Skeleton,
        'SpeedDial' : SpeedDial,
        'SplitButton' : SplitButton,
        'Splitter' : Splitter,
        'SplitterPanel' : SplitterPanel,
        'Steps' : Steps,
        'TabMenu' : TabMenu,
        'TabView' : TabView,
        'TabPanel' : TabPanel,
        'Tag' : Tag,
        'Textarea' : Textarea,
        //'Terminal' : Terminal,
        'TieredMenu' : TieredMenu,
        'Timeline' : Timeline,
        'Toast' : Toast,
        'Toolbar' : Toolbar,
        'ToggleButton' : ToggleButton,
        'Tree' : Tree,
        'TreeSelect' : TreeSelect,
        'TreeTable' : TreeTable,
        'TriStateCheckbox' : TriStateCheckbox,
        //'VirtualScroller' : VirtualScroller,
    });
}
function _setupDirectives() {
    cupparisPrimevue.CrudCore.directiveItems = Object.assign(cupparisPrimevue.CrudCore.directiveItems,{
        'tooltip': Tooltip,
        'ripple' :  Ripple,
        //'code' :  CodeHighlight,
        'badge' :  BadgeDirective,
        'styleclass' :  StyleClass,
    });
}
function _setupUses() {
    cupparisPrimevue.CrudCore.useItems = Object.assign(cupparisPrimevue.CrudCore.useItems,{
        'PrimeVue' : {
            obj : PrimeVue,
            param : { ripple: true, inputStyle: 'outlined' }
        },
        'ConfirmationService' : {
            obj : ConfirmationService,
            param : null
        },
        // 'DialogService': {
        //     obj : DialogService,
        // },
        'ToastService' : {
            obj : ToastService,
            param : null,
        },
        'router' : {
            obj : router,
            param : null,
        },
    });
}
