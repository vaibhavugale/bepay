"use client";
import React, { useState } from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { Input } from './input';
import { Select } from './select';

export type FilterField = {
  type: 'select' | 'input';
  name: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  fields: FilterField[];
  onApply?: (values: Record<string, string>) => void;
  onClear?: () => void;
}

export const FilterModal = ({ isOpen, onClose, fields, onApply, onClear }: FilterModalProps) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply?.(values);
    onClose();
  };

  const handleClear = () => {
    setValues({});
    onClear?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="side"
      title="Apply Filters"
      description="Filter table data and save filters."
      footer={
        <div className="flex flex-col gap-3 w-full pt-4">
          <Button
            className="w-full !bg-black !text-white !rounded-full py-3.5"
            onClick={handleApply}
          >
            Apply Filter
          </Button>
          <button
            className="w-full text-center text-sm font-medium text-gray-700 py-2 cursor-pointer hover:text-black transition-colors"
            onClick={handleClear}
          >
            Clear All
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-6 py-2">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <Select 
                key={field.name} 
                label={field.label}
                value={values[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            );
          }
          if (field.type === 'input') {
            return (
              <Input
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            );
          }
          return null;
        })}
      </div>
    </Modal>
  );
};
