import defaultColor from './defaultColor'
import orangeColor from "./orangeColor";
import greenColor from './greenColor'
import templateConfig from '../config/templateConfig.json';

const allColors = {
    defaultColor : defaultColor,
    orangeColor : orangeColor,
    greenColor : greenColor,
}

export default {
    getTheme() {
        return templateConfig.themeColor?allColors[templateConfig.themeColor]:allColors.defaultColor;
    },
    getThemes() {
        return allColors;
    }
}
