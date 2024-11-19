import React from 'react';
import { useForm } from 'react-hook-form';
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

type FormData = z.infer<typeof schema> & { id: number };

interface Props {
  university: FormData;
  onUpdate: () => void;
  onCancel: () => void;
}

const EditUniversityForm: React.FC<Props> = ({ university, onUpdate, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: university,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.put(`/universities/${university.id}`, data);
      onUpdate();
      reset();
    } catch (err) {
      console.error('Failed to update university:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      {/* Fields */}
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
        {university.contact_emails.map((emailObj, index) => (
          <div key={index} className="mb-2">
            <input
              {...register(`contact_emails.${index}.email` as const)}
              className="w-full p-2 border"
            />
            {errors.contact_emails && (
              <p className="text-red-500">{errors.contact_emails[index]?.email?.message}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Website</label>
        <input {...register('website')} className="w-full p-2 border" />
        {errors.website && <p className="text-red-500">{errors.website.message}</p>}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Update University
      </button>    
      <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white">
        Cancel
      </button>
    </form>
  );
};

export default EditUniversityForm;
