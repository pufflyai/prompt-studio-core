import { createIcon } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const convertIcon = (faIcon: IconDefinition) => {
  const { icon, iconName } = faIcon;
  /* (as any) is TEMPORARY FIX FOR
  error TS2742: The inferred type of 'convertIcon' cannot be named without a reference to '../../../../../node_modules/@chakra-ui/system/dist/system.types'. This is likely not portable. A type annotation is necessary.
  */
  return (createIcon as any)({
    displayName: iconName,
    viewBox: `0 0 ${icon[0]} ${icon[1]}`,
    d: icon[4] as string,
  });
};
