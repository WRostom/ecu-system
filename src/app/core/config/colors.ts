export const colors: EventColor = {
  red: {
    primary: "var(--tui-primary)",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

export interface EventColor {
  [key: string]: ColorProperties;
}

export interface ColorProperties {
  primary: string;
  secondary: string;
}
