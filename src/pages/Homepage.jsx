import React from 'react'

function Homepage() {
  return (
    <div style={{maxWidth: "800px", margin: "60px auto", padding: "0 20px", fontFamily: "'Segoe UI', Roboto, sans-serif"}}>
      <h1 style={{fontSize: "2.5rem", color: "#ffffff", marginBottom: "30px", borderBottom: "2px solid #00bcd4", paddingBottom: "10px"}}>
        Welcome to TrackMySpend
      </h1>
      <p style={{fontSize: "1.25rem", lineHeight: "1.8", color: "#e2e8f0", marginBottom: "20px", fontWeight: "500"}}>
        Managing personal finances today can be overwhelming. Many of us struggle with a common problem at the end of every month, we find ourselves wondering exactly where our hard-earned money went. Tracking daily transactions manually is tedious, and unexpected expenses constantly disrupt our financial balance. 
      </p>
      <p style={{fontSize: "1.25rem", lineHeight: "1.8", color: "#e2e8f0", fontWeight: "500"}}>
        TrackMySpend is the solution designed to bridge that gap. This application provides users with a streamlined dashboard to effortlessly log income, catalog expenses, and view real-time calculations of their remaining balance. By turning chaotic data into visual clarity, TrackMySpend helps you take immediate control of your financial habits.
      </p>
    </div>
  )
}

export default Homepage