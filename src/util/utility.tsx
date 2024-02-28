import { gameDebuggingEnabled, inDevEnvironment } from "@/settings/system";

export function DevEnvironmentConsoleLog(output: string) {
    if (gameDebuggingEnabled && inDevEnvironment) {
        console.log(output);
    }
}