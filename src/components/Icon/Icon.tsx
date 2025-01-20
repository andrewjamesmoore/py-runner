import { SVGProps } from "react";
import terminal from "../../assets/icons/terminal.svg?react";
import play from "../../assets/icons/play.svg?react";
import shieldAlert from "../../assets/icons/shield-alert.svg?react";
import bookOpen from "../../assets/icons/book-open.svg?react";
import refreshCw from "../../assets/icons/refresh-cw.svg?react";
import alertTriangle from "../../assets/icons/alert-triangle.svg?react";
import copy from "../../assets/icons/copy.svg?react";

const icons = {
  terminal,
  play,
  shieldAlert,
  bookOpen,
  refreshCw,
  alertTriangle,
  copy,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size, ...props }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent width={size} height={size} {...props} />;
}
