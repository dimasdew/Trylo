import Icon from "./Icon";

type Props = {
  flag: string;
  className?: string;
};

// Map legacy emoji-size classes (text-*) to real dimensions
function sizeFor(className: string): string {
  if (className.includes("text-5xl") || className.includes("text-6xl")) return "h-12 w-16";
  if (className.includes("text-4xl")) return "h-10 w-14";
  if (className.includes("text-3xl")) return "h-8 w-11";
  if (className.includes("text-2xl")) return "h-6 w-8";
  if (className.includes("h-") || className.includes("w-")) return "";
  return "h-6 w-8";
}

export default function Flag({ flag, className = "" }: Props) {
  const size = sizeFor(className);
  // strip text-* size classes, keep the rest
  const rest = className
    .split(" ")
    .filter((c) => !c.startsWith("text-"))
    .join(" ");

  if (flag === "globe") {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-lylac-50 border border-lylac-100 text-lylac-600 ${size} ${rest}`}
      >
        <Icon name="globe" className="h-4 w-4" />
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/${flag}.svg`}
      alt={flag}
      className={`inline-block rounded-md object-cover border border-border ${size} ${rest}`}
      loading="lazy"
    />
  );
}
