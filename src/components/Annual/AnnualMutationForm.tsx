import Box from "components/Box";
import Button from "components/Button";
import LabelledInput from "components/LabelledInput";
import LabelledSelect, { Option } from "components/LabelledSelect";
import { ProcessedAnnualDataCollection } from "helpers/getWeather";
import { GCMEnum } from "pure/enums";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export interface AnnualMutationFormProps {
    data: ProcessedAnnualDataCollection;
    onSubmit: (data: AnnualMutationType) => void;
}

export type AnnualMutationType =
    | {
          type: "new";
          gcmName: string;
          newValue: number;

          selectedGCM?: never;
          modifiedValue?: never;
      }
    | {
          type: "modify";
          selectedGCM: GCMEnum;
          modifiedValue: number;

          gcmName?: never;
          newValue?: never;
      };

export const AnnualMutationForm = ({ data, onSubmit }: AnnualMutationFormProps) => {
    const { register, handleSubmit, watch } = useForm<AnnualMutationType>({
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
                        <LabelledInput
                            key="newValue"
                            id="newValue"
                            label="Value"
                            type="number"
                            step="any"
                            required
                            {...register("newValue", {
                                required: true,
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
                        <LabelledInput
                            key="modifiedValue"
                            id="modifiedValue"
                            label="Value"
                            type="number"
                            step="any"
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
                    <Option value="modify">Modify data for an existing GCM</Option>
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
