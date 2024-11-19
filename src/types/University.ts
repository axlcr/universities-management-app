export interface ContactEmail {
  email: string;
}

export interface University {
  id: number; 
  name: string;
  location: string;
  contact_emails: ContactEmail[];
  website: string;
}
