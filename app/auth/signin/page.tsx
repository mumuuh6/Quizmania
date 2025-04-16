"use client"

import React, { Suspense } from 'react'
import Signin from './SignInPage'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signin></Signin>
    </Suspense>
  )
}
