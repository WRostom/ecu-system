import { ColorProperties, colors } from "@config/colors";

export function makeColorIterator() {
  let i = 0;
  return {
    next: (): ColorProperties => {
      const result = colors[Object.keys(colors)[i]];
      i = (i + 1) % Object.keys(colors).length;
      return result;
    },
  };
}
