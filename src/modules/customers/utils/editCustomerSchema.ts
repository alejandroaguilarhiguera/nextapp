import * as yup from 'yup';

const schema = yup.object({
  id: yup.number().required('Id is required'),
  name: yup.string().required('Name is required'),
});

export default schema;
