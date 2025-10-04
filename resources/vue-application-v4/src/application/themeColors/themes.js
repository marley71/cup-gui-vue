import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara"
import Material from "@primevue/themes/material"
import Nora from "@primevue/themes/nora"
import templateConfig from '../config/templateConfig.json';

const allThemes = {
    Aura : Aura,
    Lara : Lara,
    Material : Material,
    Nora : Nora
}

export default {
    getTheme() {
        return templateConfig.theme?allThemes[templateConfig.theme]:allThemes.Aura;
    },
    getThemes() {
        return allThemes;
    }
}
