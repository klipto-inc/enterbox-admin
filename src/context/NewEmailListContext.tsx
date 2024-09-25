"use client"
import React from 'react';


interface NewEmailContext {
  emailCsvdata?: object[]; // array of objects
  setemailcsvData: React.Dispatch<React.SetStateAction<object[]>>; // setter function for an array of objects
}


const creatEmailContext = React.createContext<NewEmailContext>({} as NewEmailContext);


export function NewEmailListContextProvider({children}: {children:React.ReactNode}) {
  const [emailCsvdata, setemailcsvData] = React.useState<object[]>([]); 
  return (
    <creatEmailContext.Provider value={{ emailCsvdata, setemailcsvData }}>
      {children}
    </creatEmailContext.Provider>
  );
}

export function UseEmailContext() {
  return React.useContext(creatEmailContext);
}
