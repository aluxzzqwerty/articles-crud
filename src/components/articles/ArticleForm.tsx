import { TextField } from "@mui/material";
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

export type FormValuesType = {
  title: string;
  description: string;
};

type MyFormOwnProps = {
  onSubmit: (formValues: FormValuesType) => void
  values?: FormValuesType
};

const ArticleForm: React.FC<MyFormOwnProps> = ({ onSubmit, values }) => {

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormValuesType>({
    values,
    resetOptions: {
      keepDirtyValues: true,
    } 
 });

  const onSubmitForm: SubmitHandler<FormValuesType> = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Controller
        control={control}
        name="title"
        rules={{ required: "You must enter a title" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Enter title"
            className="input"
            value={field.value}
            error={!!errors.title?.message}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        rules={{ required: "You must enter a description" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Enter description"
            className="input"
            value={field.value}
            error={!!errors.description?.message}
            helperText={errors.description?.message}
          />
        )}
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default ArticleForm;
