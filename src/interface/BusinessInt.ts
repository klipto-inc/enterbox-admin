import React  from "react";

export interface BusinessForm {
  businessname: string;
  businessemail: string;
  companywebsite: string;
  businessbio: string;
  businessimage:  File | null  | any;
  businesscategory: string;
}