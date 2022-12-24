import { ViewEnum } from "../pure/enums";

export default function getVariable(view: ViewEnum) {
    switch (view) {
        case ViewEnum.Temperature:
            return "tas";
        case ViewEnum.Precipitation:
            return "pr";
    }
}
