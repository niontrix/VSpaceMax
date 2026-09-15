module.exports = {
    key: "languageId:clojure",
    name: "Clojure",
    type: "bindings",
    bindings: [
        {
            key: "!",
            name: "Disconnect from REPL",
            icon: "debug-disconnect",
            type: "command",
            command: "calva.disconnect"
        },
        {
            key: "\"",
            name: "Jack-in to REPL",
            icon: "repl",
            type: "command",
            command: "calva.jackIn"
        },
        {
            key: "'",
            name: "Connect to REPL",
            icon: "repl",
            type: "command",
            command: "calva.connect"
        },
        {
            key: ".",
            name: "Connect or jack-in",
            icon: "repl",
            type: "command",
            command: "calva.jackInOrConnect"
        },
        {
            key: "=",
            name: "+Format",
            icon: "list-flat",
            type: "bindings",
            bindings: [
                {
                    key: "=",
                    name: "Format current form",
                    icon: "list-selection",
                    type: "command",
                    command: "calva-fmt.formatCurrentForm"
                },
                {
                    key: "a",
                    name: "Align current form",
                    icon: "list-flat",
                    type: "command",
                    command: "calva-fmt.alignCurrentForm"
                },
                {
                    key: "d",
                    name: "Dedent line",
                    icon: "arrow-left",
                    type: "command",
                    command: "calva-fmt.tabDedent"
                },
                {
                    key: "i",
                    name: "Indent line",
                    icon: "arrow-right",
                    type: "command",
                    command: "calva-fmt.tabIndent"
                }
            ]
        },
        {
            key: "d",
            name: "+Debug",
            icon: "bug",
            type: "bindings",
            bindings: [
                {
                    key: "i",
                    name: "Last evaluation results",
                    icon: "chevron-right",
                    type: "command",
                    command: "calva.debug.instrument"
                },
                {
                    key: "r",
                    name: "Last evaluation results",
                    icon: "chevron-right",
                    type: "command",
                    command: "calva.copyLastResults"
                },
                {
                    key: "s",
                    name: "Last stacktrace",
                    icon: "debug-stackframe",
                    type: "command",
                    command: "calva.printLastStacktrace"
                }
            ]
        },
        {
            key: "e",
            name: "+Evaluate",
            icon: "chevron-right",
            type: "bindings",
            bindings: [
                {
                    key: ":",
                    name: "Evaluate current form as comment",
                    type: "command",
                    command: "calva.evaluateSelectionAsComment"
                },
                {
                    key: ";",
                    name: "Evaluate top-level form as comment",
                    type: "command",
                    command: "calva.evaluateTopLevelFormAsComment"
                },
                {
                    key: "e",
                    name: "Evaluate current expression",
                    type: "command",
                    command: "calva.evaluateSelection"
                },
                {
                    key: "f",
                    name: "Evaluate top-level expression",
                    type: "command",
                    command: "calva.evaluateCurrentTopLevelForm"
                },
                {
                    key: "i",
                    name: "Interrupt evaluation",
                    type: "command",
                    command: "calva.interruptAllEvaluations"
                },
                {
                    key: "l",
                    name: "Clear inline evaluation results",
                    type: "command",
                    command: "calva.clearInlineResults"
                },
                {
                    key: "n",
                    name: "Evaluate all code in namespace",
                    type: "command",
                    command: "calva.loadFile"
                },
                {
                    key: "s",
                    name: "Select expression",
                    type: "command",
                    command: "calva.selectCurrentForm"
                },
                {
                    key: "t",
                    name: "Clear evaluation results",
                    type: "command",
                    command: "calva.requireREPLUtilities"
                },
                {
                    key: "w",
                    name: "Replace form with evaluation result",
                    type: "command",
                    command: "calva.evaluateSelectionReplace"
                }
            ]
        },
        {
            key: "k",
            name: "+Structural editing",
            icon: "symbol-struct",
            type: "bindings",
            bindings: [
                {
                    key: ".",
                    name: "Toggle paredit mode",
                    type: "command",
                    command: "paredit.togglemode"
                },
                {
                    key: "b",
                    name: "Barf expression forward",
                    type: "command",
                    command: "paredit.barfSexpForward"
                },
                {
                    key: "c",
                    name: "Convolute expression",
                    type: "command",
                    command: "paredit.convolute"
                },
                {
                    key: "h",
                    name: "Backward expression",
                    type: "command",
                    command: "paredit.backwardSexp"
                },
                {
                    key: "j",
                    name: "Forward down expression",
                    type: "command",
                    command: "paredit.forwardDownSexp"
                },
                {
                    key: "k",
                    name: "Backward down expression",
                    type: "command",
                    command: "paredit.backwardDownSexp"
                },
                {
                    key: "l",
                    name: "Forward expression",
                    type: "command",
                    command: "paredit.forwardSexp"
                },
                {
                    key: "r",
                    name: "Raise expression",
                    type: "command",
                    command: "paredit.raiseSexp"
                },
                {
                    key: "s",
                    name: "Slurp expression forward",
                    type: "command",
                    command: "paredit.slurpSexpForward"
                },
                {
                    key: "t",
                    name: "Transpose expression",
                    type: "command",
                    command: "paredit.transpose"
                },
                {
                    key: "B",
                    name: "Barf expression backward",
                    type: "command",
                    command: "paredit.barfSexpBackward"
                },
                {
                    key: "H",
                    name: "Backward up expression",
                    type: "command",
                    command: "paredit.backwardUpSexp"
                },
                {
                    key: "J",
                    name: "Join expression",
                    type: "command",
                    command: "paredit.joinSexp"
                },
                {
                    key: "L",
                    name: "Forward up expression",
                    type: "command",
                    command: "paredit.forwardUpSexp"
                },
                {
                    key: "S",
                    name: "Slurp expression backward",
                    type: "command",
                    command: "paredit.slurpSexpBackward"
                },
                {
                    key: "w",
                    name: "+Wrap",
                    type: "bindings",
                    bindings: [
                        {
                            key: "\"",
                            name: "Wrap around \"\"",
                            type: "command",
                            command: "paredit.wrapAroundQuote"
                        },
                        {
                            key: "(",
                            name: "Wrap around ()",
                            type: "command",
                            command: "paredit.wrapAroundParens"
                        },
                        {
                            key: "[",
                            name: "Wrap around []",
                            type: "command",
                            command: "paredit.wrapAroundSquare"
                        },
                        {
                            key: "c",
                            name: "Rewrap {}",
                            type: "command",
                            command: "paredit.rewrapCurly"
                        },
                        {
                            key: "p",
                            name: "Rewrap ()",
                            type: "command",
                            command: "paredit.rewrapParens"
                        },
                        {
                            key: "q",
                            name: "Rewrap \"\"",
                            type: "command",
                            command: "paredit.rewrapQuote"
                        },
                        {
                            key: "s",
                            name: "Rewrap []",
                            type: "command",
                            command: "paredit.rewrapSquare"
                        },
                        {
                            key: "{",
                            name: "Wrap around {}",
                            type: "command",
                            command: "paredit.wrapAroundCurly"
                        }
                    ]
                }
            ]
        },
        {
            key: "m",
            name: "+Manage REPL session",
            icon: "repl",
            type: "bindings",
            bindings: [
                {
                    key: ".",
                    name: "Connect or jack-in",
                    type: "command",
                    command: "calva.jackInOrConnect"
                },
                {
                    key: "c",
                    name: "Connect to REPL server for project",
                    type: "command",
                    command: "calva.connect"
                },
                {
                    key: "j",
                    name: "Start REPL server for project (jack-in)",
                    type: "command",
                    command: "calva.jackIn"
                },
                {
                    key: "q",
                    name: "Disconnect (quit) from REPL server",
                    type: "command",
                    command: "calva.disconnect"
                },
                {
                    key: "r",
                    name: "Refresh changed namespaces",
                    type: "command",
                    command: "calva.refresh"
                },
                {
                    key: "s",
                    name: "Select cljs build connection",
                    type: "command",
                    command: "calva.switchCljsBuild"
                },
                {
                    key: "t",
                    name: "Toggle cljc session (clj, cljs)",
                    type: "command",
                    command: "calva.toggleCLJCSession"
                },
                {
                    key: "C",
                    name: "Run custom REPL command",
                    type: "command",
                    command: "calva.runCustomREPLCommand"
                },
                {
                    key: "R",
                    name: "Refresh all namespaces",
                    type: "command",
                    command: "calva.refreshAll"
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
                    key: "a",
                    name: "+Add",
                    type: "bindings",
                    bindings: [
                        {
                            key: "l",
                            name: "Add missing library specification",
                            type: "command",
                            command: "clojureLsp.refactor.addMissingLibspec"
                        }
                    ]
                },
                {
                    key: "c",
                    name: "+Cycle clean convert",
                    type: "bindings",
                    bindings: [
                        {
                            key: "n",
                            name: "Clean namespace definition",
                            type: "command",
                            command: "clojureLsp.refactor.cleanNs"
                        },
                        {
                            key: "p",
                            name: "Cycle privacy",
                            type: "command",
                            command: "clojureLsp.refactor.cyclePrivacy"
                        }
                    ]
                },
                {
                    key: "e",
                    name: "+Extract expand",
                    type: "bindings",
                    bindings: [
                        {
                            key: "f",
                            name: "Extract function",
                            type: "command",
                            command: "clojureLsp.refactor.extractFunction"
                        },
                        {
                            key: "l",
                            name: "Expand let",
                            type: "command",
                            command: "clojureLsp.refactor.expandLet"
                        }
                    ]
                },
                {
                    key: "i",
                    name: "+Introduce inline",
                    type: "bindings",
                    bindings: [
                        {
                            key: "l",
                            name: "Introduce let",
                            type: "command",
                            command: "clojureLsp.refactor.introduceLet"
                        },
                        {
                            key: "s",
                            name: "Inline symbol",
                            type: "command",
                            command: "clojureLsp.refactor.inlineSymbol"
                        }
                    ]
                },
                {
                    key: "m",
                    name: "+Move",
                    type: "bindings",
                    bindings: [
                        {
                            key: "l",
                            name: "Move to let",
                            type: "command",
                            command: "clojureLsp.refactor.moveToLet"
                        }
                    ]
                },
                {
                    key: "t",
                    name: "+Thread macros",
                    type: "bindings",
                    bindings: [
                        {
                            key: "f",
                            name: "Thread first",
                            type: "command",
                            command: "clojureLsp.refactor.threadFirst"
                        },
                        {
                            key: "l",
                            name: "Thread last",
                            type: "command",
                            command: "clojureLsp.refactor.threadLast"
                        },
                        {
                            key: "u",
                            name: "Unwind thread",
                            type: "command",
                            command: "clojureLsp.refactor.unwindThread"
                        },
                        {
                            key: "F",
                            name: "Thread first all",
                            type: "command",
                            command: "clojureLsp.refactor.threadFirstAll"
                        },
                        {
                            key: "L",
                            name: "Thread last all",
                            type: "command",
                            command: "clojureLsp.refactor.threadLastAll"
                        },
                        {
                            key: "U",
                            name: "Unwind thread all",
                            type: "command",
                            command: "clojureLsp.refactor.unwindThread"
                        }
                    ]
                }
            ]
        },
        {
            key: "t",
            name: "+Tests",
            icon: "beaker",
            type: "bindings",
            bindings: [
                {
                    key: "a",
                    name: "Run all tests",
                    icon: "beaker",
                    type: "command",
                    command: "calva.runAllTests"
                },
                {
                    key: "f",
                    name: "Run failing tests",
                    icon: "close",
                    type: "command",
                    command: "calva.rerunTests"
                },
                {
                    key: "n",
                    name: "Run tests in current namespace",
                    icon: "symbol-namespace",
                    type: "command",
                    command: "calva.runNamespaceTests"
                },
                {
                    key: "t",
                    name: "Run current test",
                    icon: "whole-word",
                    type: "command",
                    command: "calva.runTestUnderCursor"
                }
            ]
        },
        {
            key: "T",
            name: "+Toggle",
            icon: "settings",
            type: "bindings",
            bindings: [
                {
                    key: "p",
                    name: "Toggle pretty print results",
                    icon: "eye",
                    type: "command",
                    command: "calva.togglePrettyPrint"
                }
            ]
        }
    ]
};
