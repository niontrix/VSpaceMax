const typescriptBindings = require("../typescript/bindings");
useableBindings = typescriptBindings.bindings;

module.exports = {
    key: "languageId:civet",
    name: "Civet",
    type: "bindings",
    bindings: useableBindings
};