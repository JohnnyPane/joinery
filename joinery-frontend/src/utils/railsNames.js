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

export { toPluralName, toSingularName, normalizeModelName };