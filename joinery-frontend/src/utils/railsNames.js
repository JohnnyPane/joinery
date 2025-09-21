import pluralize from "pluralize";

function toPluralName(name) {
  return pluralize(name);
}

function toSingularName(name) {
  return pluralize.singular(name);
}

export { toPluralName, toSingularName };