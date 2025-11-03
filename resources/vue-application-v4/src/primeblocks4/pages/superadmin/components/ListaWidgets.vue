<script>
import widgetConfs from "./widgetConfs";
export default {
    data() {
        return {
            widgets : [
                {
                    widget: 'w-autocomplete',
                    conf: widgetConfs.wAutocompleteConf(),
                },
                {
                    widget: 'w-belongsto',
                    conf: widgetConfs.wBelongstoConf(),
                },
                {
                    widget: 'w-belongsto-many',
                    conf: widgetConfs.wBelongstoManyConf(),
                },
                {
                    widget: 'w-checkbox',
                    conf: widgetConfs.wCheckboxConf(),
                },
                {
                    widget: 'w-chip',
                    conf: widgetConfs.wChipConf(),
                },
                {
                    widget: 'w-color-picker',
                    conf: widgetConfs.wColorPickerConf(),
                },
                {
                    widget: 'w-custom',
                    conf: widgetConfs.wCustomConf(),
                },
                {
                    widget: 'w-date-picker',
                    conf: widgetConfs.wDatePickerConf(),
                },
                {
                    widget: 'w-date-range-picker',
                    conf: widgetConfs.wDateRangePickerConf(),
                },
                {
                    widget: 'w-date-text',
                    conf: widgetConfs.wDateTextConf(),
                },
                {
                    widget: 'w-date-text',
                    conf: widgetConfs.wDateTextConf2(),
                },
                {
                    widget: 'w-editor',
                    conf: widgetConfs.wEditor(),
                },
                {
                    widget: 'w-hasmany',
                    conf: widgetConfs.wHasmany('record'),
                },
                {
                    widget: 'w-hasmany',
                    conf: widgetConfs.wHasmany('list'),
                },
                {
                    widget: 'w-hasmany',
                    conf: widgetConfs.wHasmany('view-only'),
                },
                {
                    widget: 'w-hasmany',
                    conf: widgetConfs.wHasmany('panel'),
                },
                {
                    widget: 'w-image',
                    conf: widgetConfs.wImage(),
                },
                {
                    widget: 'w-image',
                    conf: widgetConfs.wImageAvatarConf(),
                },
                {
                    widget: 'w-input',
                    conf: widgetConfs.wInputConf(),
                },
                {
                    widget: 'w-input-set',
                    conf: widgetConfs.wInputSetConf(),
                },
                {
                    widget: 'w-object',
                    conf: widgetConfs.wObject(),
                },
                {
                    widget: 'w-multi-select',
                    conf: widgetConfs.wMultiSelectConf(),
                },
                {
                    widget: 'w-radio',
                    conf: widgetConfs.wRadioConf(),
                },
                {
                    widget: 'w-select',
                    conf: widgetConfs.wSelectConf(),
                },
                {
                    widget: 'w-select-button',
                    conf: widgetConfs.wSelectButtonConf(),
                },
                {
                    widget: 'w-table',
                    conf: widgetConfs.wTable(),
                },
                {
                    widget: 'w-leaf-let',
                    conf: widgetConfs.wLeafLeft(),
                },
                {
                    widget: 'w-leaf-let',
                    conf: widgetConfs.wLeafLeftIcon(),
                },
                {
                    widget: 'w-text',
                    conf: widgetConfs.wTextConf(),
                },
                {
                    widget: 'w-textarea',
                    conf: widgetConfs.wTextareaConf(),
                },
                {
                    widget: 'w-texthtml',
                    conf: widgetConfs.wTexthtmlConf(),
                },
                {
                    widget: 'w-status',
                    conf: widgetConfs.wStatusConf(),
                },
                {
                    widget: 'w-status',
                    conf: widgetConfs.wStatusTextConf(),
                },
                {
                    widget: 'w-upload',
                    conf: widgetConfs.wUploadConf(),
                },
                {
                    widget: 'w-upload-ajax',
                    conf: widgetConfs.wUploadAjaxConf(),
                },
                {
                    widget: 'w-swap',
                    conf: widgetConfs.wSwapConf(),
                },
                {
                    widget: 'w-swap-select',
                    conf: widgetConfs.wSwapSelectConf(),
                },
            ]
        };
    }
};
</script>
<template>
    <div class="w-full grid grid-cols-2 gap-1">
        <div class="w-full border border-gray-100 border p-1" v-for="(item) in widgets">
            <div class="text-center">{{item.widget}}</div>
            <component class="w-full" :is="item.widget" :conf="item.conf"></component>
        </div>
    </div>
</template>
