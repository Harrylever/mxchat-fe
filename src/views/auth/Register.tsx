import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { classNames } from 'src/styles'
import { IUser, PageProps } from 'typings'
import DefaultWidth from 'src/components/layout/DefaultWidth'
import { isValidEmail, isValidPassword } from 'src/util/utils'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
// import { usePostRegisterMutation } from 'src/app/slices/authApiSlice'
import { useToast } from '@/components/ui/use-toast'
import { AuthRequests, useAxiosPrivate } from 'src/app'

const Register: React.FC<{ props?: PageProps }> = () => {
  const { toast } = useToast()
  const axiosPrivate = useAxiosPrivate()
  const authRequests = useMemo(
    () => new AuthRequests(axiosPrivate),
    [axiosPrivate],
  )

  const [isLoading, setIsLoading] = useState(false)

  // Form States
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [viewPassword, setViewPassword] = useState(false)

  const errorToast = ({
    title,
    description,
  }: {
    title: string
    description?: string
  }) => {
    toast({
      variant: 'destructive',
      title,
      description,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (!isValidEmail(email)) {
      setIsLoading(false)
      errorToast({ title: 'Please provide a valid email!' })
      return
    }

    if (!isValidPassword(password)) {
      setIsLoading(false)
      errorToast({
        title: 'Please provide a valid password',
        description:
          'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.',
      })
      return
    }

    const registerData: IUser = {
      username: username.toLowerCase().trim(),
      fullname,
      email: email.trim(),
      password: password.trim(),
      imgUri: 'placeholder',
    }

    try {
      const response = await authRequests.register(registerData)
      if (response.message.toLowerCase() === 'account successfully created') {
        toast({
          variant: 'success',
          title: 'Account created successfully',
          duration: 5000,
        })

        setTimeout(() => {
          window.localStorage.setItem('email', email)
          window.location.assign('/login')
        }, 3700)
        return
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any
      if (
        error.response.data.message.toLowerCase() === 'user with email exists!'
      ) {
        toast({
          variant: 'destructive',
          title: 'User already exists with email',
        })
        return
      }
      if (
        error.response.data.message.toLowerCase() ===
        'user with username exists!'
      ) {
        toast({
          variant: 'destructive',
          title: 'User already exists with username',
        })
        return
      }
      if (error.response.data.message.toLowerCase() === 'invalid password!') {
        toast({
          title: 'Please provide a valid password',
          description:
            'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.',
        })
        return
      }
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: 'Login failed. Please try again!',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DefaultWidth>
      <div className="pt-12 flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h2 className={classNames.heroText}>Welcome</h2>
          <p className={classNames.subHeroText}>Create an account</p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm w-full flex flex-col items-start justify-start">
          <div className="w-full flex items-center justify-center">
            <button type="button">
              <img
                src="/svg/google-auth-icon.svg"
                alt="Google Sign up"
                className="w-[65px] h-auto"
              />
            </button>
          </div>

          <div className="w-full flex items-center justify-center py-6 gap-5">
            {/*  */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>

            <p className="w-1/3 font-normal text-xs text-[#808080] text-center">
              or sign up with
            </p>

            {/*  */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>
          </div>

          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-mx-black"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  disabled={isLoading}
                  autoComplete="username"
                  placeholder="johndoe35x"
                  className={classNames.authFormInput}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-mx-black"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  placeholder="john doe"
                  disabled={isLoading}
                  autoComplete="fullname"
                  className={classNames.authFormInput}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-mx-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  disabled={isLoading}
                  placeholder="johndoe@gmail.com"
                  className={classNames.authFormInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-mx-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  required
                  id="password"
                  name="password"
                  value={password}
                  placeholder="*****"
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={classNames.authFormInput}
                  type={viewPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length > 1 ? (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setViewPassword(!viewPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-5 text-indigo-700"
                  >
                    {viewPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="pt-6 sm:pt-4 flex flex-row-reverse items-center text-start justify-end gap-x-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="accept-terms"
                  className="block text-sm font-medium leading-6 text-mx-black"
                >
                  I agree to the{' '}
                  <a
                    href="/terms"
                    className="text-mx-primary underline opacity-80 hover:opacity-100 duration-200"
                  >
                    Terms and Condition
                  </a>
                </label>
              </div>
              <div>
                <input
                  required
                  type="checkbox"
                  value={password}
                  id="accept-terms"
                  name="accept-terms"
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block border border-mx-stroke bg-mx-white py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-lg sm:leading-6 w-[25px] h-[25px]"
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className={clsx([
                  classNames.authFormBtn,
                  {
                    'bg-indigo-600': !isLoading,
                    'bg-indigo-400': isLoading,
                  },
                ])}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultWidth>
  )
}

export default Register