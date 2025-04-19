import { Box } from '@components/Atom/Box';
import { Button } from '@components/Atom/Button';
import { Form } from '@components/Atom/Form';
import { EyeClose } from '@components/Atom/Icon/icons/EyeClose';
import { View } from '@components/Atom/Icon/icons/View';
import { Image } from '@components/Atom/Image';
import { Input } from '@components/Atom/Input';
import { Typography } from '@components/Atom/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import useScreenSize from '@hooks/useScreenSize';
import { signInConstant } from '@pages/SignIn/constant';
import { signInSchema } from '@pages/SignIn/schema';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'src/app/apis/authApi';
import { useToast } from 'src/app/slices/toastSlice/toastSelector';
import { capitalizeFirstLetter } from 'src/common/untils/capitalizeFirstLetter';
import { getIsMobile } from 'src/common/untils/isMobile';
import { Setting } from 'src/constants/setting';

export default function SignIn() {
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const { t } = useTranslation();
  const [login] = useLoginMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigation = useNavigate();
  const { onShowToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema(t)),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await login({
        username: data[signInConstant.usernameField],
        password: data[signInConstant.passwordField],
      }).unwrap();

      onShowToast({
        message: t('login.login_success'),
        title: t('login.notification.title'),
        duration: 3000,
        position: 'top-right',
        type: 'success',
      });

      navigation('/');
    } catch (error) {
      if ((error as { status: number }).status === 404) {
        onShowToast({
          message: t('login.login_fail'),
          title: t('login.notification.title'),
          duration: 3000,
          position: 'top-right',
          type: 'warning',
        });
      }
    }

    reset({ [signInConstant.passwordField]: '' });
  };

  return (
    <Box
      maxWidth={1440}
      minWidth={320}
      m="0 auto"
      pt={{
        xs: Setting.DIGIT_16,
        md: Setting.DIGIT_32,
      }}
      pb={{
        xs: Setting.DIGIT_16,
        md: Setting.DIGIT_32,
      }}
    >
      <Box
        width={isMobile ? Setting.WIDTH_SP : Setting.WIDTH_PC}
        m="0 auto"
        display="flex"
        backgroundImage={{
          url: isMobile ? signInConstant.image : '',
        }}
        borderRadius={Setting.DIGIT_16}
      >
        {!isMobile && (
          <Box flexShrink={0} width="30%">
            <Image src={signInConstant.image} />
          </Box>
        )}
        <Box
          flexGrow={1}
          pt={isMobile ? Setting.DIGIT_16 : Setting.DIGIT_32}
          pl={isMobile ? Setting.DIGIT_16 : Setting.DIGIT_32}
          pb={isMobile ? Setting.DIGIT_16 : Setting.DIGIT_0}
          pr={isMobile ? Setting.DIGIT_16 : Setting.DIGIT_0}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={{
              xs: 16,
              md: 24,
            }}
            justifyContent="flex-end"
            pb={isMobile ? Setting.DIGIT_16 : Setting.DIGIT_32}
          >
            <Typography>{t('login.not_account')}</Typography>
            <Box>
              <Button outline size={'xSmall'} roundness="pill">
                {t('login.sign_up')}
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              border={{
                style: 'solid',
                width: Setting.DIGIT_1,
                color: 'gray',
              }}
              width={isMobile ? '100%' : '60%'}
              borderRadius={'20px'}
              p={{
                md: Setting.DIGIT_16,
                lg: '16px 24px',
              }}
              gap={{ xs: 16, md: 24 }}
              display="flex"
              flexDirection="column"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={{
                  xs: 8,
                  md: 12,
                }}
              >
                <Typography variant="h6" textAlign="center">
                  Sign In
                </Typography>
                <Typography variant="text" textAlign="center" fontSize={isMobile ? 'sm' : 'base'}>
                  {t('login.description')}
                </Typography>
              </Box>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={{
                    xs: 8,
                    md: 12,
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={{
                      xs: 4,
                      md: 6,
                    }}
                  >
                    <Typography fontSize={isMobile ? 'xs' : 'sm'}>
                      {capitalizeFirstLetter(signInConstant.usernameField)}
                    </Typography>
                    <Input
                      variant="rounded"
                      outline
                      {...register(signInConstant.usernameField)}
                      errorMessage={errors[signInConstant.usernameField]?.message}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={{
                      xs: 4,
                      md: 6,
                    }}
                  >
                    <Typography fontSize={isMobile ? 'xs' : 'sm'}>
                      {capitalizeFirstLetter(signInConstant.passwordField)}
                    </Typography>
                    <Input
                      variant="rounded"
                      outline
                      {...register(signInConstant.passwordField)}
                      type={isShowPassword ? 'text' : 'password'}
                      errorMessage={errors[signInConstant.passwordField]?.message}
                      autoComplete={signInConstant.passwordField}
                      suffix={
                        isShowPassword ? (
                          <View size="large" color="gray-500" />
                        ) : (
                          <EyeClose size="large" color="gray-500" />
                        )
                      }
                      onClickSuffix={() => setIsShowPassword(!isShowPassword)}
                    />
                  </Box>
                  <Button color="success" fullWidth roundness="pill" type="submit">
                    {capitalizeFirstLetter(signInConstant.loginButton)}
                  </Button>
                </Box>
              </Form>
              <Typography fontSize={isMobile ? 'sm' : 'base'}>{signInConstant.or.toUpperCase()}</Typography>
              <Box display="flex" flexDirection="column" gap={Setting.DIGIT_8}>
                <Button color="dark" fullWidth roundness="pill">
                  Google
                </Button>
                <Button color="info" fullWidth roundness="pill">
                  Facebook
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
