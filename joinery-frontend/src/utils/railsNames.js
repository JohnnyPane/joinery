import pluralize from "pluralize";

function toPluralName(name) {
  return pluralize(name);
}

function toSingularName(name) {
  return pluralize.singular(name);
}

function normalizeModelName(name){
  return name.split("_").join(" ")
}

const camelToSnakeCase = (camelCaseString) => {
  return camelCaseString
  .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
  .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
  .toLowerCase();
};

export const snakeToCamelCase = (snakeCaseString) => {
  const camelCased = snakeCaseString.replace(/_([a-z])/g, (match, char) => char.toUpperCase());
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
};

export { toPluralName, toSingularName, normalizeModelName, camelToSnakeCase };