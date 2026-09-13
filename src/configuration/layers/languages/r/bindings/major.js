module.exports = {
    key: "languageId:r",
    name: "R",
    type: "bindings",
    bindings: [
        {
            key: "'",
            name: "Create R Terminal",
            icon: "terminal",
            type: "command",
            command: "r.createRTerm"
        },
        {
            key: "d",
            name: "Debugonce",
            type: "command",
            icon: "debug",
            command: "r.runCommandWithSelectionOrWord",
            args: "debugonce($$)"
        },
        {
            key: "h",
            name: "Help",
            icon: "question",
            type: "command",
            command: "r.helpPanel.openForSelection"
        },
        {
            key: "m",
            name: "Create R Terminal",
            icon: "terminal",
            type: "command",
            command: "r.createRTerm"
        },
        {
            key: "o",
            name: "Objects in workspace R",
            type: "command",
            icon: "symbol-field",
            command: "r.runCommand",
            args: "sort(sapply(ls(), function(x){object.size(get(x))})) "
        },
        {
            key: "s",
            name: "Run selection",
            icon: "play",
            type: "command",
            command: "r.runSelection"
        },
        {
            key: "R",
            name: "Restart R",
            type: "command",
            icon: "debug-restart",
            command: "r.runCommand",
            args: "rstudioapi::restartSession()"
        },
        {
            key: "=",
            name: "+Format",
            icon: "list-flat",
            type: "bindings",
            bindings: [
                {
                    key: "=",
                    name: "Format region or buffer",
                    icon: "list-flat",
                    type: "command",
                    command: "editor.action.format"
                },
                {
                    key: "b",
                    name: "Format buffer",
                    icon: "file",
                    type: "command",
                    command: "editor.action.formatDocument"
                },
                {
                    key: "c",
                    name: "Format changes",
                    icon: "diff",
                    type: "command",
                    command: "editor.action.formatChanges"
                },
                {
                    key: "s",
                    name: "Format selection",
                    icon: "selection",
                    type: "command",
                    command: "editor.action.formatSelection"
                },
                {
                    key: "B",
                    name: "Format buffer with formatter",
                    icon: "file",
                    type: "command",
                    command: "editor.action.formatDocument.multiple"
                },
                {
                    key: "S",
                    name: "Format selection with formatter",
                    icon: "selection",
                    type: "command",
                    command: "editor.action.formatSelection.multiple"
                }
            ]
        },
        {
            key: "a",
            name: "+Code actions",
            icon: "zap",
            type: "bindings",
            bindings: [
                {
                    key: "a",
                    name: "Execute code action",
                    icon: "lightbulb",
                    type: "command",
                    command: "editor.action.codeAction"
                },
                {
                    key: "f",
                    name: "Execute fix action",
                    icon: "lightbulb-autofix",
                    type: "command",
                    command: "editor.action.quickFix"
                },
                {
                    key: "r",
                    name: "Refactor action",
                    icon: "edit",
                    type: "command",
                    command: "editor.action.refactor"
                },
                {
                    key: "s",
                    name: "Source action",
                    icon: "lightbulb",
                    type: "command",
                    command: "editor.action.sourceAction"
                }
            ]
        },
        {
            key: "g",
            name: "+Go to",
            icon: "go-to-file",
            type: "bindings",
            bindings: [
                {
                    key: "d",
                    name: "Go to declaration",
                    icon: "symbol-struct",
                    type: "command",
                    command: "editor.action.revealDeclaration"
                },
                {
                    key: "e",
                    name: "Go to errors/problems",
                    icon: "error",
                    type: "command",
                    command: "workbench.actions.view.problems"
                },
                {
                    key: "f",
                    name: "Go to file in explorer",
                    icon: "file",
                    type: "command",
                    command: "workbench.files.action.showActiveFileInExplorer"
                },
                {
                    key: "g",
                    name: "Go to definition",
                    icon: "symbol-function",
                    type: "command",
                    command: "editor.action.revealDefinition"
                },
                {
                    key: "r",
                    name: "Go to reference",
                    icon: "symbol-reference",
                    type: "command",
                    command: "editor.action.goToReferences"
                },
                {
                    key: "s",
                    name: "Go to symbol in buffer",
                    icon: "symbol-class",
                    type: "command",
                    command: "workbench.action.gotoSymbol"
                },
                {
                    key: "R",
                    name: "Find references",
                    icon: "symbol-reference",
                    type: "command",
                    command: "references-view.findReferences"
                },
                {
                    key: "S",
                    name: "Go to symbol in project",
                    icon: "symbol-class",
                    type: "command",
                    command: "workbench.action.showAllSymbols"
                }
            ]
        },
        {
            key: "p",
            name: "+Package",
            icon: "list-flat",
            type: "bindings",
            bindings: [
                {
                    key: "c",
                    name: "Check",
                    icon: "list-flat",
                    type: "command",
                    command: "r.check"
                },
                {
                    key: "d",
                    name: "Document",
                    icon: "file",
                    type: "command",
                    command: "r.document"
                },
                {
                    key: "l",
                    name: "Load All",
                    icon: "repl",
                    type: "command",
                    command: "r.loadAll"
                },
                {
                    key: "p",
                    name: "pgkdown build site",
                    icon: "gear",
                    type: "command",
                    command: "r.runCommand",
                    args: "pkgdown::build_site()"
                },
                {
                    key: "t",
                    name: "Test",
                    icon: "beaker",
                    type: "command",
                    command: "r.test"
                }
            ]
        },
        {
            key: "r",
            name: "+Refactor",
            icon: "edit",
            type: "bindings",
            bindings: [
                {
                    key: "r",
                    name: "Rename Symbol",
                    icon: "symbol-keyword",
                    type: "command",
                    command: "editor.action.rename"
                }
            ]
        },
        {
            key: "v",
            name: "+View",
            icon: "preview",
            type: "bindings",
            bindings: [
                {
                    key: "c",
                    name: "Column numbers",
                    type: "command",
                    icon: "list-ordered",
                    command: "r.runCommandWithSelectionOrWord",
                    args: "ncol($$)"
                },
                {
                    key: "h",
                    name: "head",
                    type: "command",
                    icon: "list-filter",
                    command: "r.head"
                },
                {
                    key: "l",
                    name: "length",
                    type: "command",
                    icon: "list-ordered",
                    command: "r.length"
                },
                {
                    key: "n",
                    name: "Names",
                    type: "command",
                    icon: "symbol-parameter",
                    command: "r.names"
                },
                {
                    key: "p",
                    name: "print",
                    icon: "symbol-field",
                    type: "command",
                    command: "r.runCommandWithSelectionOrWord",
                    args: "$$"
                },
                {
                    key: "r",
                    name: "Row numbers",
                    type: "command",
                    icon: "list-ordered",
                    command: "r.nrow"
                },
                {
                    key: "s",
                    name: "str",
                    type: "command",
                    icon: "list-flat",
                    command: "r.runCommandWithSelectionOrWord",
                    args: "str($$)"
                },
                {
                    key: "v",
                    name: "View",
                    type: "command",
                    icon: "preview",
                    command: "r.view"
                },
                {
                    key: "C",
                    name: "Column names",
                    type: "command",
                    icon: "symbol-key",
                    command: "r.runCommandWithSelectionOrWord",
                    args: "colnames($$)"
                },
                {
                    key: "R",
                    name: "Row names",
                    type: "command",
                    icon: "preserve-case",
                    command: "r.runCommandWithSelectionOrWord",
                    args: "rownames($$)"
                }
            ]
        },
        {
            key: "G",
            name: "+Peek",
            icon: "eye",
            type: "bindings",
            bindings: [
                {
                    key: "d",
                    name: "Peek declaration",
                    icon: "symbol-struct",
                    type: "command",
                    command: "editor.action.peekDeclaration"
                },
                {
                    key: "g",
                    name: "Peek definition",
                    icon: "symbol-function",
                    type: "command",
                    command: "editor.action.peekDefinition"
                },
                {
                    key: "r",
                    name: "Peek references",
                    icon: "symbol-reference",
                    type: "command",
                    command: "editor.action.referenceSearch.trigger"
                }
            ]
        }
    ]
};
