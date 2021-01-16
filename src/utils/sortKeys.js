const sortKeys = object =>
  Object(object) !== object || Array.isArray(object)
    ? object
    : Object.keys(object)
        .sort()
        .reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue]: sortKeys(object[currentValue])
          }),
          {}
        );

export default sortKeys;
