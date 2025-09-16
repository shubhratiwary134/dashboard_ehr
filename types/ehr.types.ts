// EHR types definitions

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface ModMedPatient extends Patient {
  // ModMed specific fields can be added here
}

export interface AthenaPatient extends Patient {
  // Athena specific fields can be added here
}
