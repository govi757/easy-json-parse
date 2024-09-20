// Function to safely access nested properties
function getNestedValue(obj, path) {
  return path
    .split(".")
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : "NA"),
      obj
    );
}
function getNestedValueForArray(obj, path) {
  const parts = path.split(".");

  function traverse(current, parts) {
    if (!parts.length) return current;

    const [part, ...restParts] = parts;
    const isArrayExpression = part.includes("[*]");

    if (isArrayExpression) {
      const key = part.replace("[*]", "");
      if (Array.isArray(current[key])) {
        return current[key].reduce((acc, item) => {
          const value = traverse(item, restParts);
          return acc + (typeof value === 'number' ? value : 0);
        }, 0);
      }
    } else {
      return current && current[part] !== undefined
        ? traverse(current[part], restParts)
        : "NA";
    }
  }

  return traverse(obj, parts);
}
// Function to evaluate expressions in the spec
function evaluateExpression(expression, context) {
  // console.log(expression,"expression")
  const keys = Object.keys(context);
  const values = Object.values(context);
  let modifiedExpression = "";
  const isArrayExpression = expression.match(/\[\*\]/g, ""); // Remove [*] notation
  if (isArrayExpression) {
    const obj = getNestedValueForArray(context, expression);
    // console.log(obj, "obj");
    modifiedExpression =  `${obj}`;
  } else {
    // Replace @property.path with actual values
    modifiedExpression = expression.replace(/@([\w.]+)/g, (_, path) => {
      const value = getNestedValue(context, path);
      console.log(value, "value");
      return typeof value === "string" ? `'${value}'` : value;
    });
  }

  // Create a function that evaluates the modified expression
  console.log(modifiedExpression,"Modifield exp")
  const func = new Function(...keys, `return ${modifiedExpression};`);

  try {
    return func(...values);
  } catch (error) {
    return "NA";
  }
}

// Function to transform the object based on the spec
function transformObject(data, spec) {
  let result = {};

  for (let key in spec) {
    if (typeof spec[key] === "string") {
      if (spec[key].startsWith("@")) {
        // Evaluate the expression
        const expression = spec[key].substring(1); // Remove the '@' symbol
        result[key] = evaluateExpression(expression, data);
      }
    } else if (typeof spec[key] === "object") {
      // Recursive transformation for nested objects
      result[key] = transformObject(data, spec[key]);
    }
  }

  return result;
}

// Transform the object
// const transformedData = transformObject(data, spec);
module.exports = transformObject;
