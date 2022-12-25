import Box from "components/Box";
import Button from "components/Button";
import LabelledInput from "components/LabelledInput";
import LabelledSelect, { Option } from "components/LabelledSelect";
import LabelledTextArea from "components/LabelledTextArea";
import { ProcessedMonthlyDataCollection } from "helpers/getWeather";
import { GCMEnum, MonthEnum } from "pure/enums";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export interface MonthlyMutationFormProps {
    data: ProcessedMonthlyDataCollection;
    onSubmit: (data: MonthlyMutationType) => void;
}

export type MonthlyMutationType =
    | {
          type: "new";
          gcmName: string;
          newValues: string;

          selectedGCM?: never;
          selectedMonth?: never;
          modifiedValue?: never;
      }
    | {
          type: "modify";
          selectedGCM: GCMEnum;
          selectedMonth: MonthEnum;
          modifiedValue: number;

          gcmName?: never;
          newValues?: never;
      };
export const MonthlyMutationForm = ({ data, onSubmit }: MonthlyMutationFormProps) => {
    const { register, handleSubmit, watch } = useForm<MonthlyMutationType>({
        defaultValues: {
            type: "new",
        },
    });

    const type = watch("type");
    const fields = useMemo(() => {
        switch (type) {
            case "new":
                return (
                    <>
                        <LabelledInput
                            id="gcmName"
                            label="GCM Name"
                            type="text"
                            required
                            {...register("gcmName", {
                                required: true,
                            })}
                        />
                        <LabelledTextArea
                            key="newValues"
                            id="newValues"
                            label="Value"
                            placeholder="A comma separated list of values, each entry representing a month..."
                            required
                            {...register("newValues", {
                                maxLength: 200,
                                required: true,
                                pattern: /^(\d+(?:\.\d+)?(?:,\s*\d+(?:\.\d+)?)*)$/,
                            })}
                        />
                    </>
                );
            case "modify":
                return (
                    <>
                        <LabelledSelect
                            id="selectedGCM"
                            label="GCM"
                            required
                            {...register("selectedGCM", {
                                required: true,
                            })}
                        >
                            {data.map((d, index) => (
                                <Option key={index} value={d.gcm}>
                                    {d.gcm}
                                </Option>
                            ))}
                        </LabelledSelect>
                        <LabelledSelect
                            id="selectedMonth"
                            label="Month"
                            required
                            {...register("selectedMonth", {
                                required: true,
                            })}
                        >
                            {Object.keys(MonthEnum).map((m, index) => (
                                <Option key={index} value={m}>
                                    {m}
                                </Option>
                            ))}
                        </LabelledSelect>
                        <LabelledInput
                            key="modifiedValue"
                            id="modifiedValue"
                            label="Value"
                            type="number"
                            required
                            {...register("modifiedValue", {
                                required: true,
                            })}
                        />
                    </>
                );
        }
    }, [data, register, type]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box spacing=".5rem">
                <LabelledSelect
                    id="type"
                    label="I want to"
                    required
                    {...register("type", {
                        required: true,
                    })}
                >
                    <Option value="new">Submit data for a new GCM</Option>
                    <Option value="modify">Modify data for an existing GCM/month</Option>
                </LabelledSelect>
                {fields}
                <Button
                    type="submit"
                    style={{
                        marginTop: ".6rem",
                    }}
                >
                    Confirm Submission
                </Button>
            </Box>
        </form>
    );
};
