import * as Yup from "yup";
const currentYear = new Date().getFullYear(); // Get the current year

export const validateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price field is required"),
  bedroom: Yup.number()
    .typeError("Bedroom must be a number")
    .positive("Bedroom must be a positive number")
    .required("Bedroom field is required"),
  bathrooms: Yup.number()
    .typeError("Bathrooms must be a number")
    .positive("Bathrooms must be a positive number")
    .required("Bathrooms field is required"),
  size: Yup.number()
    .typeError("Size must be a number")
    .positive("Size must be a positive number")
    .required("Size field is required"),
  floor: Yup.number()
    .typeError("Floor must be a number")
    .positive("Floor must be a positive number")
    .min(0, "Floor must be at least 0")
    .max(10, "Floor must be at must 10")
    .required("floor field is required"),
  garage: Yup.string()
    .typeError("Garage must be a alphabetic")
    .max(3, "Garage must be at must 3")
    .required("Garage field is required"),

  renovation: Yup.string().max(3, "Renovation must be at must 3").required("Renovation field is required"),
  furnishing: Yup.string().max(3, "Furnishing must be at must 3").required("Furnishing field is required"),
  address: Yup.string().required("Address field is required"),
  constructionYear: Yup.string()
        .typeError("This field must be a valid year")
 
        .required("This field is required")
        .test('is-past-year', 'Selected year cannot be in the future', function (value) {
         
          const selectedYear = parseInt(value, 10); // Convert string to integer
         
          const result = selectedYear <= currentYear; // Validate against the current year
          
          return result;
      }),
      
  // images: Yup.mixed().required("Media is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address.").required().label("Email"),
  password: Yup.string()
    .required()
    .min(6, 'Password should have more than 6 characters')
    .label("Password")
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .max(30, 'Name cannot exceed 30 characters')
    .min(3, 'Name should have more than 3 characters')
    .label("Name"),
  email: Yup.string()
    .email('Invalid email address.')
    .required()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, 'Password should hazve more than 6 characters')
    .label("Password"),
});