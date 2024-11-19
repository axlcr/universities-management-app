import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../services/api';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  location: z.string().nonempty('Location is required'),
  contact_emails: z
    .array(
      z.object({
        email: z.string().email('Invalid email').nonempty('Email is required'),
      })
    )
    .min(1, 'At least one email is required'),
  website: z.string().url('Invalid URL').nonempty('Website is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onAdd: () => void;
}

const AddUniversityForm: React.FC<Props> = ({ onAdd }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      location: '',
      contact_emails: [{ email: '' }],
      website: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact_emails',
  });

  const onSubmit = async (data: FormData) => {
    try {
      const submissionData = {
        ...data,
        contact_emails: data.contact_emails.map((emailObj) => emailObj.email),
      };
      await api.post('/universities', submissionData);
      reset();
      onAdd();
    } catch (err) {
      console.error('Failed to add university:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input {...register('name')} className="w-full p-2 border" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input {...register('location')} className="w-full p-2 border" />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contact Emails</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex mb-2">
            <input
              {...register(`contact_emails.${index}.email`)}
              className="w-full p-2 border"
            />
            <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ email: '' })} className="mt-2 text-blue-500">
          Add Email
        </button>
        {errors.contact_emails && (
          <p className="text-red-500">{errors.contact_emails.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Website</label>
        <input {...register('website')} className="w-full p-2 border" />
        {errors.website && <p className="text-red-500">{errors.website.message}</p>}
      </div>
      
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Add University
      </button>
    </form>
  );
};

export default AddUniversityForm;
