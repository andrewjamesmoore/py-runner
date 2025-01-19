import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const darkTheme = createTheme({
  theme: "dark",
  settings: {
    foreground: "var(--text-color-alt)",
    caret: "var(--color-accent)",
    lineHighlight: "transparent",
    gutterBackground: "var(--color-gutter-background)",
    gutterForeground: "var(--text-color-alt)",
    selection: "var(--color-selection)",
    selectionMatch: "var(--color-selection-match)",
  },
  styles: [
    { tag: t.comment, color: "var(--color-comment)" },
    { tag: t.variableName, color: "var(--color-name-tags)" },
    { tag: t.string, color: "var(--color-type-tags)" },
    { tag: t.number, color: "var(--color-type-tags)" },
    { tag: [t.keyword, t.operator], color: "var(--color-type-tags)" },
    { tag: t.definitionKeyword, color: "var(--color-type-tags)" },
    { tag: t.function(t.variableName), color: "var(--color-type-tags)" },
    { tag: t.typeName, color: "var(--color-name-tags)" },
    { tag: t.className, color: "var(--color-type-tags)" },
    { tag: t.special(t.variableName), color: "var(--color-name-tags)" },
  ],
});
