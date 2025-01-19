import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const darkTheme = createTheme({
  theme: "dark",
  settings: {
    foreground: "var(--text-color-alt)",
    caret: "var(--color-accent)",
    lineHighlight: "var(--bg-color-alt)",
    gutterBackground: "transparent",
    gutterForeground: "var(--text-color-alt)",
  },
  styles: [
    { tag: t.comment, color: "--text-color-subdued" },
    { tag: t.variableName, color: "#c9aef5" },
    { tag: t.string, color: "#a3e635" },
    { tag: t.number, color: "#a3e635" },
    { tag: [t.keyword, t.operator], color: "#a3e635" },
    { tag: t.definitionKeyword, color: "#a3e635" },
    { tag: t.function(t.variableName), color: "#a3e635" },
    { tag: t.typeName, color: "#c9aef5" },
    { tag: t.className, color: "#a3e635" },
    { tag: t.special(t.variableName), color: "#c9aef5" },
  ],
});
