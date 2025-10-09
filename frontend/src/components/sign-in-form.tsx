import { useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'
import InputComponent from '../components/input.component'
import { authClient } from '../lib/auth-client'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Spinner } from './ui/spinner'

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void
}) {
  const navigate = useNavigate()
  const { isPending } = authClient.useSession()

  const signInWithGoogle = async () => {
    await authClient.signIn.social(
      { provider: 'google' },
      {
        onSuccess: () => {
          navigate('/home')
          toast.success('Sign in successful')
        },
        onError: (error) => {
          toast.error(error.error.message || error.error.statusText)
        },
      },
    )
  }

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            navigate('/home')
            toast.success('Sign in successful')
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText)
          },
        },
      )
    },
    validators: {
      onSubmit: z.object({
        email: z.email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
      }),
    },
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  return (
    <div className="space-y-8 w-full max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your email and password to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-4 w-full"
          >
            <div>
              <form.Field name="email">
                {field => (
                  <div className="space-y-2">
                    <InputComponent type="email" onBlur={field.handleBlur} value={field.state.value} onChange={e => field.handleChange(e.target.value)} name={field.name} required label="Email" placeholder="Email" />
                    {field.state.meta.errors.map(error => (
                      <p key={error?.message} className="text-red-500">
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>

            <div>
              <form.Field name="password">
                {field => (
                  <div className="space-y-2">

                    <InputComponent type="password" onBlur={field.handleBlur} value={field.state.value} onChange={e => field.handleChange(e.target.value)} name={field.name} required label="Password" placeholder="Password" />
                    {field.state.meta.errors.map(error => (
                      <p key={error?.message} className="text-red-500">
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>
            <form.Subscribe>
              {state => (
                <>
                  {' '}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!state.canSubmit || state.isSubmitting}
                  >
                    {state.isSubmitting ? <Spinner /> : 'Sign In'}
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={signInWithGoogle}
                    disabled={!state.canSubmit || state.isSubmitting}
                  >
                    {state.isSubmitting ? <Spinner /> : 'Google'}
                  </Button>
                  {' '}

                </>

              )}
            </form.Subscribe>
          </form>

          <div className="mt-4 text-center">
            <Button
              type="button"
              onClick={onSwitchToSignUp}
              variant="link"
              className=""
            >
              Need an account? Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
