/* eslint-disable @cspell/spellchecker */
/* eslint-disable sonarjs/no-duplicate-string */
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
import { signUpConstant } from '@pages/SignUp/constant';
import { signUpSchema } from '@pages/SignUp/schema';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from 'src/app/apis/authApi';
import { useToast } from 'src/app/slices/toastSlice/toastSelector';
import { capitalizeFirstLetter } from 'src/common/untils/capitalizeFirstLetter';
import { getIsMobile } from 'src/common/untils/isMobile';
import { ScreenPath } from 'src/constants/screen';
import { Setting } from 'src/constants/setting';

export default function SignUp() {
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const { t } = useTranslation();
  const [userRegister] = useRegisterMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const navigation = useNavigate();
  const { onShowToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema(t)),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await userRegister({
        username: data[signUpConstant.usernameField],
        password: data[signUpConstant.passwordField],
      }).unwrap();

      onShowToast({
        message: t('login.register_success'),
        title: t('login.notification.title'),
        duration: 3000,
        position: 'top-right',
        type: 'success',
      });

      navigation('/');
    } catch (error) {
      if ((error as { status: number }).status === 409) {
        onShowToast({
          message: t('login.existing_account'),
          title: t('login.notification.title'),
          duration: 3000,
          position: 'top-right',
          type: 'warning',
        });
      }

      onShowToast({
        message: t('login.server_error'),
        title: t('login.notification.title'),
        duration: 3000,
        position: 'top-right',
        type: 'error',
      });
    }

    reset({ [signUpConstant.passwordField]: '', [signUpConstant.confirmField]: '' });
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
          url: isMobile ? signUpConstant.image : '',
        }}
        borderRadius={Setting.DIGIT_16}
      >
        {!isMobile && (
          <Box flexShrink={0} width="30%">
            <Image src={signUpConstant.image} />
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
            <Typography>{t('login.have_account')}</Typography>
            <Box>
              <Link to={ScreenPath.SIGN_IN}>
                <Button outline size={'xSmall'} roundness="pill">
                  {t('login.sign_in')}
                </Button>
              </Link>
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
                  {t('login.sign_in')}
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
                    <Typography fontSize={isMobile ? 'xs' : 'sm'}>{t('login.username')}</Typography>
                    <Input
                      variant="rounded"
                      outline
                      {...register(signUpConstant.usernameField)}
                      errorMessage={errors[signUpConstant.usernameField]?.message}
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
                    <Typography fontSize={isMobile ? 'xs' : 'sm'}>{t('login.password')}</Typography>
                    <Input
                      variant="rounded"
                      outline
                      {...register(signUpConstant.passwordField)}
                      type={isShowPassword ? 'text' : 'password'}
                      errorMessage={errors[signUpConstant.passwordField]?.message}
                      autoComplete={signUpConstant.passwordField}
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
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={{
                      xs: 4,
                      md: 6,
                    }}
                  >
                    <Typography fontSize={isMobile ? 'xs' : 'sm'}>{t('login.password_confirm')}</Typography>
                    <Input
                      variant="rounded"
                      outline
                      {...register(signUpConstant.confirmField)}
                      type={isShowConfirmPassword ? 'text' : 'password'}
                      errorMessage={errors[signUpConstant.confirmField]?.message}
                      autoComplete={signUpConstant.confirmField}
                      suffix={
                        isShowConfirmPassword ? (
                          <View size="large" color="gray-500" />
                        ) : (
                          <EyeClose size="large" color="gray-500" />
                        )
                      }
                      onClickSuffix={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                    />
                  </Box>
                  <Button color="success" fullWidth roundness="pill" type="submit">
                    {capitalizeFirstLetter(t('login.register'))}
                  </Button>
                </Box>
              </Form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
