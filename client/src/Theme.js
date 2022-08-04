import createTheme from '@mui/material/styles/createTheme'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'

const Theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3772ff',
        contrastText: '#fcfcfd',
      },
      secondary: {
        main: '#45b26b',
        contrastText: '#fcfcfd',
      },
      text: {
        primary: '#23262f',
        secondary: '#777e90',
        accent: '#aaaab3',
        disabled: '#e6e8ec',
        selection: '#353945',
        contrast: '#fcfcfd',
        light: '#f4f5f6',
      },
    },
    typography: (palette) => ({
      fontFamily: 'neue-haas-grotesk-display, sans-serif',
      h1: {
        fontWeight: 650,
      },
      h2: {
        fontWeight: 650,
      },
      h3: {
        fontWeight: 650,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 700,
      },
      subtitle2: {
        fontWeight: 700,
      },
      overline: {
        fontWeight: 700,
      },
    }),
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.secondary,
            border: `2px solid ${theme.palette.text.disabled}`,
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: 0.9,
            borderRadius: 30,
            paddingRight: 14,
            paddingLeft: 14,
          }),
        },
      },
      MuiSlider: {
        styleOverrides: {
          rail: ({ theme }) => ({
            backgroundColor: theme.palette.text.secondary,
          }),
          thumb: ({ theme }) => ({
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: 'inherit',
            },
            '&:before': {
              display: 'none',
            },
          }),
        },
      },
      MuiFab: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            fontWeight: 500,
            color: theme.palette.text.secondary,
            transition: 'all 0.2s',
            ':hover': {
              color: theme.palette.primary.main,
            },
          }),
        },
      },
      MuiChip: {
        variants: [
          {
            props: { variant: 'outlined' },
            style: ({ theme, ownerState }) => ({
              border: `2px solid ${
                theme.palette?.[ownerState.color]?.main || theme.palette.text.disabled
              }`,
              borderRadius: 6,
              color: theme.palette?.[ownerState.color]?.main || theme.palette.text.secondary,
              fontWeight: 600,
              '& .MuiChip-label': {
                paddingLeft: 6,
                paddingRight: 6,
              },
            }),
          },
          {
            props: { variant: 'status' },
            style: ({ theme, ownerState }) => ({
              border: `2px solid ${
                theme.palette?.[ownerState.color]?.main || theme.palette.text.disabled
              }`,
              borderRadius: 6,
              color:
                theme.palette?.[ownerState.color]?.contrastText || theme.palette.text.contrastText,
              fontWeight: 600,
              letterSpacing: 1.1,
              '& .MuiChip-label': {
                paddingLeft: 6,
                paddingRight: 6,
                textTransform: 'uppercase',
              },
            }),
          },
        ],
      },
      MuiAlert: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
        variants: [
          {
            props: { variant: 'outlined' },
            style: ({ theme }) => ({
              '& .MuiOutlinedInput-input': {
                paddingTop: 12,
                paddingBottom: 12,
              },
              '& .MuiOutlinedInput-root': {
                color: theme.palette.text.primary,
                fontWeight: 500,
                fontSize: 14,
                borderRadius: '12px',
                paddingTop: 0,
                paddingBottom: 0,
                '& fieldset': {
                  border: `2px solid ${theme.palette.text.disabled}`,
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                },
                '&:hover fieldset': {
                  borderColor: `${theme.palette.text.disabled}`,
                },
                '&.Mui-focused fieldset': {
                  borderColor: `${theme.palette.text.secondary}`,
                },
              },
            }),
          },
        ],
      },
      MuiPaper: {
        variants: [
          {
            props: { variant: 'plain' },
            style: {
              boxShadow: '0px 64px 98px -48px rgba(31, 47, 70, 0.24)',
              borderRadius: '24px',
            },
          },
          {
            props: { variant: 'elevation' },
            style: {
              borderRadius: '12px',
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              border: '2px solid #e6e8ec',
              boxShadow: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)',
              borderRadius: '24px',
            },
          },
        ],
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 28,
            textTransform: 'none',
            fontWeight: 'bold',
            paddingBottom: 8,
            paddingTop: 8,
          },
        },
        variants: [
          {
            props: { size: 'small' },
            style: {
              paddingBottom: 4,
              paddingTop: 4,
              paddingLeft: 10,
              paddingRight: 10,
            },
          },
          {
            props: { variant: 'select-large' },
            style: {
              borderRadius: 12,
              color: '#23262f',
              fontWeight: 700,
              fontSize: 34,
              justifyContent: 'space-between',
              paddingBottom: 6,
              paddingTop: 6,
              paddingLeft: 12,
              paddingRight: 12,
            },
          },
          {
            props: { variant: 'select' },
            style: {
              backgroundColor: '#fcfcfd',
              borderRadius: 12,
              border: '2px solid #e6e8ec',
              color: '#23262f',
              fontWeight: 500,
              justifyContent: 'space-between',
              paddingBottom: 6,
              paddingTop: 6,
              paddingLeft: 12,
              paddingRight: 12,
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              border: '2px solid #e6e8ec',
              color: '#23262f',
              ':hover': {
                border: '2px solid #3772ff',
                color: '#fff',
                backgroundColor: '#3772ff',
              },
            },
          },
          {
            props: { variant: 'text' },
            style: {
              color: '#23262f',
              ':hover': {
                color: '#3772ff',
                backgroundColor: 'rgba(0, 0, 0, 0)',
              },
            },
          },
        ],
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: 'rgba(0, 0, 0, 0)',
            transition: 'all 0.2s',
            ':hover': {
              color: theme.palette.primary.main,
              backgroundColor: 'rgba(0, 0, 0, 0)',
            },
          }),
        },
      },
    },
  })
)

export default Theme
