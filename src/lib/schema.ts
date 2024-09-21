import * as yup from "yup";

export const donationCreateSchema = yup
  .object({
    donorName: yup.string().required("Name is required."),
    donorEmail: yup.string().email().required("Email is required."),
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

export const crisisSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  imageUrls: yup
    .array()
    .of(
      yup.mixed().test("fileType", "Only images are allowed", (value) => {
        return value && value.type.startsWith("image/");
      })
    )
    .min(1, "At least one image is required")
    .max(4, "You can upload up to 4 images"),
  locations: yup.string().required("Location is required."),
  severity: yup.string().required("Severity is required"),
  requiredHelp: yup.string().required("Required help is needed"),
});

export const signupSchema = yup.object({
  firstName: yup.string().required("Firs Name is required"),
  lastName: yup.string().optional(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signinSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
