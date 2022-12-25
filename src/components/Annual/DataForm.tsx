import Box from "components/Box";
import Button from "components/Button";
import LabelledInput from "components/LabelledInput";
import LabelledSelect, { Option } from "components/LabelledSelect";
import { GCMEnum } from "pure/enums";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export interface DataFormProps {
    onSubmit: (data: AnnualMutationType) => void;
}

export type AnnualMutationType =
    | {
          type: "new";
          gcmName: GCMEnum;
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

export const DataForm = ({ onSubmit }: DataFormProps) => {
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
                            <Option value={GCMEnum.Access1}>{GCMEnum.Access1}</Option>
                            <Option value={GCMEnum.Bnu}>{GCMEnum.Bnu}</Option>
                            <Option value={GCMEnum.Canesm2}>{GCMEnum.Canesm2}</Option>
                            <Option value={GCMEnum.Csiro}>{GCMEnum.Csiro}</Option>
                            <Option value={GCMEnum.Gfdl}>{GCMEnum.Gfdl}</Option>
                            <Option value={GCMEnum.Hadgem2}>{GCMEnum.Hadgem2}</Option>
                            <Option value={GCMEnum.Ipsl}>{GCMEnum.Ipsl}</Option>
                            <Option value={GCMEnum.Miroc5}>{GCMEnum.Miroc5}</Option>
                            <Option value={GCMEnum.Mri}>{GCMEnum.Mri}</Option>
                            <Option value={GCMEnum.Noresm1}>{GCMEnum.Noresm1}</Option>
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
    }, [register, type]);

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
