import clsx from 'clsx'
import * as z from 'zod'
import { classNames } from 'src/styles'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { Input, AcceptTermsInput } from '../Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { POST_REQUEST_MESSAGE_RESPONSE } from 'src/app'
import { useCreateAccountMutation } from 'src/app/api/hooks'
import { ICreateAccountFormValues } from 'typings'

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Required',
  }),
  firstName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
  email: z.string().email({ message: 'Required' }),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
  }),
  acceptTerms: z.literal(true),
})

const RegisterPageForm = () => {
  const navigate = useNavigate()

  const { mutateAsync: createAccount, isPending } = useCreateAccountMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      acceptTerms: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const accountData: ICreateAccountFormValues = {
        email: values.email.trim(),
        username: values.username.trim().toLowerCase(),
        firstname: values.firstName.trim().toLowerCase(),
        lastname: values.lastName.trim().toLowerCase(),
        password: values.password,
      }
      const response = await createAccount(accountData)

      if (response.message === POST_REQUEST_MESSAGE_RESPONSE.ACCOUNT_CREATED) {
        toast({
          variant: 'success',
          title: 'Hooray 🎉',
          description: 'Account created successfully',
        })
        window.localStorage.setItem('auth-user-email', values.email.trim())
        return navigate('/auth/login', { replace: true })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong',
        description: error?.response?.data?.message ?? '',
      })
    }
  }

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        required
        label="username"
        labelText="User name"
        register={register}
        placeholder="johndoe"
        error={errors.username}
      />

      <Input
        required
        label="firstName"
        labelText="First name"
        register={register}
        placeholder="John"
        error={errors.firstName}
      />

      <Input
        required
        label="lastName"
        labelText="Last name"
        register={register}
        placeholder="Donut"
        error={errors.lastName}
      />

      <Input
        required
        label="email"
        labelText="Email address"
        register={register}
        placeholder="johndoe@gmail.com"
        error={errors.email}
      />

      <Input
        required
        type="password"
        label="password"
        labelText="Password"
        register={register}
        error={errors.password}
      />

      <AcceptTermsInput
        label="acceptTerms"
        register={register}
        error={errors.acceptTerms}
      />

      <button
        type="submit"
        disabled={isPending}
        className={clsx([
          classNames.authFormBtn,
          'mt-2',
          {
            'bg-indigo-600 hover:bg-indigo-800': !isPending,
            'bg-indigo-300': isPending,
          },
        ])}
        name="submit-create-account-btn"
      >
        {isPending ? 'Loading...' : 'Sign up'}
      </button>
    </form>
  )
}

export default RegisterPageForm
