export type personExcel = {
    "Phone Number": any;
    Email: string,
    Linkedin: string,
  }
  interface QueryParams {
    filter: string;
  }
  
  export type CandidateData = {
    name: string;
    linkedIn?: string;
    experience: {
      title: string;
      start: string;
      end: string;
    }[]
  }

export type Profile = {
    contact_info: ContactInfo;
    experience: Experience[];
};

type ContactInfo = {
    name: Name;
    phone: string;
    email: string;
};

type Name = {
    formatted_name: string;
}

type Experience = {
    end_date: string;
    title: string;
    start_date: string;
};