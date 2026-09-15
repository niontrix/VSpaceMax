module.exports = {
    key: "languageId:agda",
    name: "Agda",
    type: "bindings",
    bindings: [
        {
            key: ",",
            name: "Show goal type and context (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.goal-type-and-context[Simplified]"
        },
        {
            key: ".",
            name: "Show goal type, context and inferred type (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.goal-type-context-and-inferred-type[Simplified]"
        },
        {
            key: "=",
            name: "Show constraints",
            icon: "repl",
            type: "command",
            command: "agda-mode.show-constraints"
        },
        {
            key: "?",
            name: "Show all goals",
            icon: "repl",
            type: "command",
            command: "agda-mode.show-goals"
        },
        {
            key: "a",
            name: "Automatic proof search",
            icon: "repl",
            type: "command",
            command: "agda-mode.auto"
        },
        {
            key: "b",
            name: "Move to previous goal",
            icon: "repl",
            type: "command",
            command: "agda-mode.previous-goal"
        },
        {
            key: "c",
            name: "Case split",
            icon: "repl",
            type: "command",
            command: "agda-mode.case"
        },
        {
            key: "d",
            name: "Infer type (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.infer-type[Simplified]"
        },
        {
            key: "e",
            name: "Show context (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.context[Simplified]"
        },
        {
            key: "f",
            name: "Move to next goal",
            icon: "repl",
            type: "command",
            command: "agda-mode.next-goal"
        },
        {
            key: "h",
            name: "Show helper function type (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.helper-function-type[Simplified]"
        },
        {
            key: "l",
            name: "Load file",
            icon: "repl",
            type: "command",
            command: "agda-mode.load"
        },
        {
            key: "n",
            name: "Compute normal form (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.compute-normal-form[DefaultCompute]"
        },
        {
            key: "r",
            name: "Refine",
            icon: "repl",
            type: "command",
            command: "agda-mode.refine"
        },
        {
            key: "s",
            name: "Solve constraints (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.solve-constraints[Simplified]"
        },
        {
            key: "t",
            name: "Show goal type (simplified)",
            icon: "repl",
            type: "command",
            command: "agda-mode.goal-type[Simplified]"
        },
        {
            key: "w",
            name: "Why in scope",
            icon: "repl",
            type: "bindings",
            command: "agda-mode.why-in-scope"
        },
        {
            key: "x",
            name: "+Backend",
            icon: "repl",
            type: "bindings",
            bindings: [
                {
                    key: "c",
                    name: "Compile module",
                    icon: "repl",
                    type: "command",
                    command: "agda-mode.compile"
                },
                {
                    key: "h",
                    name: "Toggle display of implicit arguments",
                    icon: "repl",
                    type: "command",
                    command: "agda-mode.toggle-display-of-implicit-arguments"
                },
                {
                    key: "q",
                    name: "Quit",
                    icon: "repl",
                    type: "command",
                    command: "agda-mode.quit"
                },
                {
                    key: "r",
                    name: "Restart",
                    icon: "repl",
                    type: "command",
                    command: "agda-mode.restart"
                }
            ]
        }
    ]
};
