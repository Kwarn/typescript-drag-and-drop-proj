// --- Validation ---

export interface Validateable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate({
  value,
  required,
  minLength,
  maxLength,
  min,
  max,
}: Validateable) {
  let isValid = true;
  if (required) {
    isValid = isValid && value.toString().trim().length !== 0;
  }
  if (
    // != includes undefined & null !== null only includes null
    minLength != null &&
    typeof value === 'string'
  ) {
    isValid = isValid && value.length >= minLength;
  }
  if (maxLength != null && typeof value === 'string') {
    isValid = isValid && value.length <= maxLength;
  }
  if (min != null && typeof value === 'number') {
    isValid = isValid && value >= min;
  }
  if (max != null && typeof value === 'number') {
    isValid = isValid && value <= max;
  }
  return isValid;
}
