import * as yup  from 'yup';

const schema = yup.object({
    name: yup.string().required('Customer name is required'),
})

export default schema;