"use client"
import React from "react"
import NotSignedhoc from "@//helper/hoc/notSignedhoc"


function layout({ children }: { children: React.ReactNode }) {
    
    return (
        <>
        {children}
        </>
    )
      
}
  
const Layout = NotSignedhoc(layout)

export default Layout;