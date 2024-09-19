import * as yup from "yup";

export const donationCreateSchema = yup
  .object({
    name: yup.string().required("Name is required."),
    email: yup.string().email().required("Email is required."),
    message: yup.string().optional(),
    amount: yup.number().positive().required("Amount is required."),
  })
  .required();

export const donationUpdateSchema = yup
  .object({
    name: yup.string().optional(),
    email: yup.string().email().optional(),
    message: yup.string().optional(),
    amount: yup.number().positive().optional(),
  })
  .required();
