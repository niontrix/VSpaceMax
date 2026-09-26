module.exports = {
    key: "r",
    name: "+Refactor",
    icon: "edit",
    type: "bindings",
    bindings: [
        {
            key: "c",
            name: "Copy",
            command: "editor.action.codeAction",
            args: {
                kind: "refactor.copy"
            }
        },
        {
            key: "d",
            name: "Delete",
            command: "editor.action.codeAction",
            args: {
                kind: "refactor.delete"
            }
        },
        {
            key: "e",
            name: "Extract",
            command: "editor.action.codeAction",
            args: {
                kind: "refactor.extract"
            }
        },
        {
            key: "f",
            name: "Fix all",
            command: "editor.action.codeAction",
            args: {
                kind: "refactor.fixAll"
            }
        },
        {
            key: "i",
            name: "Inline",
            command: "editor.action.codeAction",
            args: {
                kind: "refactor.inline"
            }
        },
        {
            key: "o",
            name: "Organize imports",
            command: "editor.action.organizeImports",
        },
        {
            key: "m",
            name: "Move",
            command: "editor.action.codeAction",
            args: {
                kind: "refactor.move"
            }
        },
        {
            key: "q",
            name: "Quick fix",
            command: "editor.action.quickFix",
        },
        {
            key: "r",
            name: "Rename",
            command: "editor.action.rename",
        },
        {
            key: "s",
            name: "Surround with",
            command: "editor.action.codeAction",
            args: {
                kind: "refactor.surroundWith"
            }
        }        
    ],
};
