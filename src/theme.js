import { createTheme } from '@mui/material/styles'

export const fontSans = "'Inter Variable', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
export const fontHeading = "'Manrope Variable', Manrope, ui-sans-serif, system-ui, sans-serif"
export const fontMono = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

/**
 * Board / departure-arrival / countdown numerals should use theme.typography.mono
 * (a custom typography key, not one of MUI's variants) applied via sx, e.g.
 *   sx={{ fontFamily: theme.typography.mono.fontFamily, fontVariantNumeric: 'tabular-nums' }}
 * The board surface tokens (boardBg/boardAlt/boardText/boardMuted) live on the
 * palette for the split-flap departure board component.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7F8FA',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#0B5FA5',
      light: '#3D82C4',
      dark: '#08477A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#334155',
      contrastText: '#FFFFFF',
    },
    success: { main: '#0F9D58', light: '#E4F6EC', dark: '#0B7A44' },
    warning: { main: '#B45309', light: '#FEF3E2', dark: '#7C3E07' },
    error: { main: '#C0293A', light: '#FBE7E9', dark: '#8F1F2C' },
    info: { main: '#0B5FA5', light: '#E5F0FA', dark: '#08477A' },
    text: {
      primary: '#14181F',
      secondary: '#5B6472',
    },
    divider: 'rgba(20, 24, 31, 0.1)',
    board: {
      bg: '#121417',
      alt: '#17191c',
      text: '#F4F1E8',
      muted: '#B8BDC5',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: fontSans,
    h1: { fontFamily: fontHeading, fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontFamily: fontHeading, fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontFamily: fontHeading, fontWeight: 800, letterSpacing: '-0.015em' },
    h4: { fontFamily: fontHeading, fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontFamily: fontHeading, fontWeight: 700 },
    h6: { fontFamily: fontHeading, fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
    overline: { fontWeight: 700, letterSpacing: '0.14em' },
    mono: { fontFamily: fontMono, fontVariantNumeric: 'tabular-nums' },
  },
  transitions: prefersReducedMotion
    ? {
        create: () => 'none',
      }
    : undefined,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F7F8FA',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          fontWeight: 700,
          boxShadow: 'none',
        },
        sizeSmall: { paddingInline: 14 },
        containedPrimary: {
          '&:hover': { boxShadow: '0 6px 16px rgba(11,95,165,0.25)' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid rgba(20, 24, 31, 0.09)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
        label: {
          paddingInline: 10,
        },
        sizeSmall: {
          height: 24,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 12,
          minHeight: 40,
          '&.Mui-focusVisible': {
            outline: '2px solid #0B5FA5',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          padding: 4,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paperAnchorBottom: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#14181F',
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: prefersReducedMotion,
      },
    },
  },
})

export default theme
