// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (fontFamily: string) => ({
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    fontSize: 38,
    lineHeight: 1.21
  },
  h2: {
    fontWeight: 600,
    fontSize: 38,
    lineHeight: 1.27
  },
  h3: {
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 1.33
  },
  h4: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 1.4
  },
  h5: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.5
  },
  h6: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.57
  },
  caption: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.66
  },
  body1: {
    fontSize: 14,
    lineHeight: 1.57
  },
  body2: {
    fontSize: 12,
    lineHeight: 1.66
  },
  subtitle1: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.57
  },
  subtitle2: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.66
  },
  overline: {
    lineHeight: 1.66
  },
  button: {
    textTransform: 'capitalize'
  }
});

export default Typography;
