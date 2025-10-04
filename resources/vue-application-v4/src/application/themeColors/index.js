import defaultColor from './defaultColor'
import orangeColor from "./orangeColor";
import greenColor from './greenColor'
import blueColor from './blueColor'
import templateConfig from '../config/templateConfig.json';

const allColors = {
    defaultColor : defaultColor,
    orangeColor : orangeColor,
    greenColor : greenColor,
    blueColor : blueColor
}

export default {
    getTheme() {
        return templateConfig.themeColor?allColors[templateConfig.themeColor]:allColors.defaultColor;
    },
    getThemes() {
        return allColors;
    }
}
