import {definePreset} from "@primeuix/themes";
import themes from "./themes";

const MyPreset = definePreset(themes.getTheme(), {
        components: {
            inputtext: {
                root: {
                    paddingX: '0.5rem',
                    paddingY: '0.5rem',
                    sm: {
                        paddingX: '0.35rem',
                        paddingY: '0.35rem'
                    }
                }
            },
            button: {
                colorScheme: {
                    light: {
                        outlined: {
                            primary : {
                                color: '{sky.600}',
                                borderColor: '{sky.600}'
                            },
                            success : {
                                color: '{green.600}',
                                borderColor: '{green.600}'
                            },
                            danger : {
                                color: '{red.600}',
                                borderColor: '{red.600}'
                            }
                        },
                    },
                    dark: {
                        outlined: {
                            primary : {
                                color: '{sky.500}',
                                borderColor: '{sky.500}'
                            }
                        },
                    },
                },
                root: {
                    paddingX: '0.75rem',
                    paddingY: '0.75rem',
                    sm: {
                        paddingX: '0.35rem',
                        paddingY: '0.35rem'
                    }
                }
            },
            panel: {
                root: {
                    title: {
                        fontWeight: '500'
                    }
                }
            },
            accordion: {
                root: {
                    header: {
                        padding: '0.6rem'
                    }
                }
            },

        },
        semantic: {
            formField: {
                paddingY: "0.5rem",
                paddingX: "0.75rem",
            },
            root: {
                icon: {
                    size: "1.25rem"
                },
            },
            colorScheme: {
                light: {
                    primary: {
                        color: '{sky.600}',
                        // inverseColor: '{sky.950}',
                        hoverColor: '{sky.800}',
                        activeColor: '{sky.300}',
                        contrastColor: '{sky.50}',
                        50: '{sky.50}',
                        100: '{sky.100}',
                        200: '{sky.200}',
                        300: '{sky.300}',
                        400: '{sky.400}',
                        500: '{sky.500}',
                        600: '{sky.600}',
                        700: '{sky.700}',
                        800: '{sky.800}',
                        900: '{sky.900}',
                        950: '{sky.950}'
                    },
                    surface: {
                        0: '#ffffff',
                        50: '{slate.50}',
                        100: '{slate.100}',
                        200: '{slate.200}',
                        300: '{slate.300}',
                        400: '{slate.400}',
                        500: '{slate.500}',
                        600: '{slate.600}',
                        700: '{slate.700}',
                        800: '{slate.800}',
                        900: '{slate.900}',
                        950: '{slate.950}'
                    }
                },
                dark: {
                    primary: {
                        color: '{blue.500}',
                        inverseColor: '{blue.950}',
                        hoverColor: '{blue.700}',
                        activeColor: '{blue.600}',
                        contrastColor: '{blue.300}',
                        50: '{blue.50}',
                        100: '{blue.100}',
                        200: '{blue.200}',
                        300: '{blue.300}',
                        400: '{blue.400}',
                        500: '{blue.500}',
                        600: '{blue.600}',
                        700: '{blue.700}',
                        800: '{blue.800}',
                        900: '{blue.900}',
                        950: '{blue.950}'
                    },
                    highlight: {
                        background: 'rgba(250, 250, 250, .16)',
                        focusBackground: 'rgba(250, 250, 250, .24)',
                        color: 'rgba(255,255,255,.87)',
                        focusColor: 'rgba(255,255,255,.87)'
                    },
                    surface: {
                        0: '#ffffff',
                        50: '{slate.50}',
                        100: '{slate.100}',
                        200: '{slate.200}',
                        300: '{slate.300}',
                        400: '{slate.400}',
                        500: '{slate.500}',
                        600: '{slate.600}',
                        700: '{slate.700}',
                        800: '{slate.800}',
                        900: '{slate.900}',
                        950: '{slate.950}'
                    }
                }
            }
        }
    })
;

export default MyPreset;
