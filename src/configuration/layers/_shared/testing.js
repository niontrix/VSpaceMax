module.exports = {
    key: "t",
    name: "+Testing",
    type: "bindings",
    bindings: [
        {
            key: "a",
            name: "+AI/Copilot",
            type: "bindings",
            bindings: [
                {
                    key: "f",
                    name: "Fix test failure",
                    icon: "testing-failed-icon",
                    type: "command",
                    command: "github.copilot.tests.fixTestFailure.fromInline"
                },
                {
                    key: "F",
                    name: "Chat: Fix test failure",
                    icon: "testing-failed-icon",
                    type: "command",
                    command: "github.copilot.tests.fixTestFailure"
                }
            ]
        },
        {
            key: "c",
            name: "Run tests with coverage",
            icon: "beaker",
            type: "command",
            command: "testing.runWithCoverage"
        },
        {
            key: "d",
            name: "Debug test at cursor",
            icon: "testing-debug-icon",
            type: "command",
            command: "testing.debugTestAtCursor"
        },
        {
            key: "f",
            name: "Run failed tests",
            icon: "testing-failed-icon",
            type: "command",
            command: "testing.reRunFailTests"
        },
        {
            key: "r",
            name: "Run test at cursor",
            icon: "testing-run-icon",
            type: "command",
            command: "testing.runTestAtCursor"
        },
        {
            key: "C",
            name: "Clear test results",
            icon: "trash",
            type: "command",
            command: "testing.clearTestResults"
        },
        {
            key: "D",
            name: "Debug failed tests from last run",
            icon: "testing-debug-icon",
            type: "command",
            command: "testing.debugFailedFromLastRun"
        },
        {
            key: "F",
            name: "Run tests in current file",
            icon: "file",
            type: "command",
            command: "testing.runCurrentFile"
        },
        {
            key: "R",
            name: "Run all tests",
            icon: "beaker",
            type: "command",
            command: "testing.runAll"
        } 
    ]
};
