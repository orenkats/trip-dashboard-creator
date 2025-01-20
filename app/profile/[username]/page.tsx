'use client'

import Profile from '@/pages/Profile'
import { useParams } from 'next/navigation'

export default function ProfilePage() {
  const params = useParams()
  return <Profile params={{ username: params.username as string }} />
}