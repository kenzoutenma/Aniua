'use client';

import FI from '@/app/api/index';
import useUserProfile from '@/features/user/hooks/useUserProfile';
import { userAPIConstant } from '@/shared/constants/api-endpoints.constant';
import { getTranslatedText } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Login() {
  const router = useRouter();
  const { fetchUserProfile, setLoginState } = useUserProfile();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginForms>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin: SubmitHandler<LoginForms> = async (data) => {
    try {
      const res = await FI.fetch<{ success: boolean }>(userAPIConstant['login'], {
        to: 'self',
        method: 'POST',
        body: {
          username: data.username,
          password: data.password,
        },
      });

      if (!res.ok) {
        toast.error(getTranslatedText('toast.fetchLoginError'));
        return;
      }

      if (res.data.success == true) {
        await fetchUserProfile();
        toast.success(getTranslatedText('toast.LoginSuccess'));
        router.push('/');
        setLoginState(true);
      } else {
        toast.error(getTranslatedText('toast.LoginFailedUser'));
        return { success: false };
      }
    } catch (e) {
      toast.error(getTranslatedText('toast.ServerError'));
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)} className="w-full rounded-xl flex flex-col gap-5">
      <Controller
        control={control}
        name="username"
        rules={{
          required: getTranslatedText('login.Required field'),
          minLength: { value: 2, message: getTranslatedText('login.More than', { count: 2 }) },
        }}
        render={({ field: { ref, value, ...field } }) => (
          <Input
            {...field}
            value={value}
            errorString={errors.username?.message}
            label={getTranslatedText('login.username')}
            ref={ref}
            type={'login'}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: getTranslatedText('login.Required field'),
          minLength: { value: 8, message: getTranslatedText('login.More than', { count: 8 }) },
        }}
        render={({ field: { ref, value, ...field } }) => (
          <Input
            {...field}
            value={value}
            errorString={errors.password?.message}
            label={getTranslatedText('login.password')}
            ref={ref}
            type={'password'}
          />
        )}
      />
      <Button type="submit" variant="primary" disabled={!isValid}>
        {getTranslatedText('login.SubmitLogin') || 'Submit'}
      </Button>
    </form>
  );
}

export default Login;
