'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { authApi } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  Mail,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'
import Logo from '../components/Logo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  // ===============================
  // 🔥 TEST KONEKSI BACKEND (SEMENTARA)
  // ===============================
  useEffect(() => {
    authApi
      .testConnection()
      .then(res => {
        console.log('KONEKSI BACKEND OK:', res)
      })
      .catch(err => {
        console.error('KONEKSI BACKEND GAGAL:', err)
      })
  }, [])

  // ===============================
  // HANDLE LOGIN
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      // redirect ditangani AuthContext
    } catch (err: any) {
      setError(err.message || 'Email atau password salah')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/grid-pattern.svg')] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-90 -z-10"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <Logo className="mx-auto mb-4 scale-125" />
            <h2 className="text-3xl font-bold">Selamat Datang</h2>
            <p className="text-sm text-gray-600">
              Masuk untuk mengelola sekolah Anda
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg"
                  placeholder="nama@sekolah.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border rounded-lg"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <Link href="/lupa-password" className="text-blue-600 font-semibold">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>

            <div className="text-center text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link href="/daftar-sekolah" className="text-blue-600 font-semibold">
                Daftar Sekolah
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} YukSekolah
        </p>
      </div>
    </div>
  )
}
