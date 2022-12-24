import { ViewEnum } from "pure/enums";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts/types/component/Tooltip";

export interface WeatherTooltipProps extends TooltipProps<ValueType, NameType> {
    view: ViewEnum;
}

export const WeatherTooltip = ({ view, label, payload }: WeatherTooltipProps) => {
    let unit = "";
    switch (view) {
        case ViewEnum.Temperature:
            unit = "℃";
            break;
        case ViewEnum.Precipitation:
            unit = "mm";
            break;
    }
    return (
        <div
            style={{
                padding: ".5rem 1rem",
                backgroundColor: "#111827",
            }}
        >
            <p>{label}</p>
            <p>
                {view}: {payload && payload.length > 0 && `${payload[0].value} ${unit}`}
            </p>
        </div>
    );
};
