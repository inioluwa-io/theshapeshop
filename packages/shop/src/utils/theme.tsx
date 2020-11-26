import { createGlobalStyle } from "styled-components"
import reset from "styled-reset-advanced"
import { darken, lighten } from "polished"

// const mainBrandColor = "#f4a191"
const mainBrandColor = "#aa4b34"
// const mainBrandColor = "#f8b6a9"
// const lightAccent = "#f49b9a"
const lightAccent = "#eb7672"
const darkAccent = "#da635e"
const lightShades = "#333"
const darkShades = "#202020"

export const theme = {
  // It can be liberally applied to your layout as its main identity.
  mainBrandColor,
  // Accent colors can be used to bring attention to design elements
  // by contrasting with the rest of the palette.
  lightAccent,
  // lightAccent: "#FFDC57",
  // Use this color as the background for your dark-on-light designs,
  // or the text color of an inverted design.
  lightShades,
  // Another accent color to consider. Not all colors have to be used -
  // sometimes a simple color scheme works best.
  darkAccent,
  // Use as the text color for dark-on-light designs,
  // or as the background for inverted designs.
  darkShades,
  dangerColor: "#f44336",

  primaryColor: mainBrandColor,
  borderColor: "#e0e6ef",
  backgroundColor: "#FFFFFF",
  backgroundInputColor: lightShades,
  backgroundInputColorDark: darkShades,
  fontSize: 16,
  fontSizeSmall: 14,
  fontSizeExtraSmall: 12,
  fontSizeMedium: 18,
  fontSizeLarge: 22,
  textColor: lightShades, // '#0A0B11',
  textColorInverse: darkShades,
  textColorLite: "#8B8989",
  menuTintColor: darkAccent,
  primaryFontFamily: "'Open Sans', sans-serif",
  secondaryFontFamily: "'Open Sans', sans-serif",
  boxShadow: "rgba(0,0,0,0.08) 0px 7px 18px",
}

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    font-family: ${theme.secondaryFontFamily};
    color: ${theme.textColor};
    // letter-spacing: 0.03rem !important;
    font-size: 16px;
    line-height:normal;
    letter-spacing: normal;
    font-family: Karla, Arial;
  }
  .title {
    font-family: ${theme.primaryFontFamily};
  }
  *{
    overflow: unset;
    // scroll-behavior: smooth;
  }
  .button {
    font-family: ${theme.primaryFontFamily};
  }
  p {
  }
  p, .title, .box {
    color: ${theme.textColor} ;
  }
  .subtitle {
    color: ${lighten(0.06, theme.textColor)} ;
  }
  .button.is-primary {
    background-color: ${theme.mainBrandColor};
    transition: background-color 0.2s ease;
    :hover {
      background-color: ${darken(0.06, theme.mainBrandColor)};
    }
  }
  .button.is-secondary {
    background-color: ${theme.lightAccent};
    transition: background-color 0.2s ease;
    color: #ffffff;
    :hover {
      background-color: ${darken(0.06, theme.lightAccent)};
    }
  }
  .button.is-link {
    background-color: ${theme.darkAccent};
    transition: background-color 0.2s ease;
    :hover {
      background-color: ${darken(0.06, theme.darkAccent)};
    }
  }
  .button, .input, .card {
    box-shadow: ${theme.boxShadow};
  }
  .has-text-warning {
    color: ${theme.lightAccent} !important;
  }
  .container {
    max-width:unset;
  }
  .has-sm-padding{
    padding: 30px;
  }
  .page-width{
    padding: 0 40px;
  }
  .small-page-width{
    padding: 0 20px;
  }

  .section {
    padding: 3rem 1.5rem;
    &.page-width{
      padding-left:70px;
      padding-right:70px;

      @media (max-width: 991px) {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
    &.small-page-width{
      padding-left: 30px;
      padding-right: 30px;

      @media (max-width: 991px) {
        padding-left: 20px;
        padding-right: 20px;
      }
      
    }
    .row{
      display:flex;
    }

    .flex{
      display:flex;

      &.gap-15{
        grid-gap:15px;
      }
      &.gap-20{
        grid-gap:20px;
      }
      &.gap-30{
        grid-gap:30px;
      }
      &.gap-40{
        grid-gap:40px;
      }
      &.gap-60{
        grid-gap:60px;
      }
      
      &.flex-column{
        flex-direction:column;
      }
    }
}
`

export default GlobalStyle
