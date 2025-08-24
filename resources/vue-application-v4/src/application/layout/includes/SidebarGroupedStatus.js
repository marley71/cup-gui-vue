import {defineStore} from "pinia";

export const SidebarGroupedStatus = defineStore('SidebarGroupedStatus', {

    state: () => {
        return {
            opened : {},
            selected : '',
        }
    },
    actions : {
        setOpen(key,value) {
            this.opened[key] = value;
        },
        setSelected(key) {
            this.selected = key;
        },
        isSelected(key) {
            return (key == this.selected);
        }
    },
    persist : true,
})
