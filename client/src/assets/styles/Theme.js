import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#80CBC4',
    },
    secondary: {
      main: '#FFCC80',
    },
  },
});

export default theme = responsiveFontSizes(theme);
