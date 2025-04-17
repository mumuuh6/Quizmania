"use client"

import React, { Suspense } from 'react'
import Signin from './SignInPage'
import BrainLoading from '@/app/components/brain-loading'

export default function page() {
  return (
    <Suspense fallback={<div><BrainLoading></BrainLoading></div>}>
      <Signin></Signin>
    </Suspense>
  )
}
