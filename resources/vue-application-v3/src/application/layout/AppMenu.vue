<template>
    <AppSubmenu class="layout-menu" :items="model" :layoutMode="layoutMode" :menuActive="active" :mobileMenuActive="mobileMenuActive" :root="true" :parentMenuItemActive="true" />
</template>

<script>
import AppSubmenu from './AppSubmenu.vue';

function findObject(array, property, value) {
    for (const element of array) {
        // Controlla se l'elemento ha la proprietà e il valore desiderato
        if (element[property] === value) {
            return element;
        }

        // Controlla se ci sono proprietà che sono array o oggetti
        for (const key in element) {
            if (Array.isArray(element[key])) {
                const found = findObject(element[key], property, value);
                if (found) {
                    return found; // Ritorna se trovato nell'array
                }
            } else if (typeof element[key] === 'object' && element[key] !== null) {
                const found = findObject([element[key]], property, value);
                if (found) {
                    return found; // Ritorna se trovato nell'oggetto
                }
            }
        }
    }
    return null; // Ritorna null se non trovato
}

export default {
    props: {
        model: Array,
        layoutMode: String,
        active: Boolean,
        mobileMenuActive: Boolean,
    },
    components: {
        AppSubmenu: AppSubmenu,
    },
    mounted() {
        //console.debug('clicche4',this.model)
        // codice per il posizionamento automatico sul menu attivo
        if (window.MENUCLICCHED) {
            let id = 'menu_' + btoa(window.MENUCLICCHED);
            this.scrollTo(id);
        } else {
            let hash = window.location.hash.substring(1);
            let obj = findObject(this.model,'to',hash);
            if (obj) {
                console.debug('clicche4 torato',obj)
                let id = 'menu_' + btoa(obj.to);
                this.scrollTo(id);
            }
        }
    },
    methods : {
        scrollTo(id) {
            //console.debug('clicche4',id)
            let rowToMove = document.getElementById(id);
            setTimeout(function () {
                //console.debug('clicche44',id,rowToMove.closest('ul'));
                let ul = rowToMove.closest('ul');
                let elementRect = rowToMove.getBoundingClientRect();
                if (ul) {
                    if (ul.style.display == 'none') {
                        ul.style.display = '';
                    }
                }
                rowToMove.scrollIntoViewIfNeeded();
            },10)
        }
    }
};
</script>

<style scoped></style>
