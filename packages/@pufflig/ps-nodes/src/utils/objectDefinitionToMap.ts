import { ObjectDefinition } from "@pufflig/ps-types";

export const objectDefinitionToMap = (definition: ObjectDefinition) => {
  const map = {} as Record<string, string | number>;
  definition.forEach((item) => {
    map[item.id] = item.defaultValue;
  });
  return map;
};
