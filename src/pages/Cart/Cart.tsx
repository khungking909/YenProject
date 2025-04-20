import { Box } from '@components/Atom/Box';
import { BreadCrumb } from '@components/Atom/BreadCrumb';
import { Button } from '@components/Atom/Button';
import { Form } from '@components/Atom/Form';
import { ArrowRight } from '@components/Atom/Icon/icons/ArrowRight';
import { Gift } from '@components/Atom/Icon/icons/Gift';
import { Input } from '@components/Atom/Input';
import { Typography } from '@components/Atom/Typography';
import { CartCard } from '@components/Molecules/CartCard';
import { Loading } from '@components/Organism/Loading';
import { zodResolver } from '@hookform/resolvers/zod';
import useScreenSize from '@hooks/useScreenSize';
import { couponSchema } from '@pages/Cart/schema';
import { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  useGetCartsQuery,
  useRemoveItemFromCartMutation,
  useUpdateCartItemMutation,
} from 'src/app/apis/cartApit';
import { useLazyGetCouponByCodeQuery } from 'src/app/apis/couponApi';
import { capitalizeFirstLetter } from 'src/common/untils/capitalizeFirstLetter';
import { getIsMobile } from 'src/common/untils/isMobile';
import { ScreenPath } from 'src/constants/screen';
import { Setting } from 'src/constants/setting';

export default function CartPage() {
  const { t } = useTranslation();
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const {
    data: carts = { items: [], totalPrice: 0, totalQuantity: 0 },
    isLoading,
    isFetching,
  } = useGetCartsQuery();
  const [fetchCoupon, { data: coupon }] = useLazyGetCouponByCodeQuery();
  const [couponCodeError, setCouponCodeError] = useState<string | null>(null);
  const [removeItem] = useRemoveItemFromCartMutation();
  const [updateItem] = useUpdateCartItemMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(couponSchema(t)),
  });

  const handleApplyCoupon = async (data: FieldValues) => {
    const { code } = data;
    try {
      await fetchCoupon(code).unwrap();

      setCouponCodeError(null);
    } catch (error) {
      if ((error as { status: number }).status === 404) {
        setCouponCodeError('Code is invalid');
      }
    }

    reset();
  };

  const handleTotalPrice = useMemo(() => {
    if (coupon) return carts.totalPrice - coupon.discount;

    return carts.totalPrice;
  }, [coupon, carts.totalPrice]);

  const onRemoveItem = async (cartId: string | number) => {
    try {
      await removeItem(cartId.toString()).unwrap();
    } catch (error) {
      if ((error as { status: number }).status === 404) {
        ///21312
      }
    }
  };

  const onUpdateItem = async (cartId: string | number, quantity: number) => {
    try {
      await updateItem({ cartId: cartId.toString(), quantity }).unwrap();
    } catch (error) {
      if ((error as { status: number }).status === 404) {
        ///21312
      }
    }
  };

  return (
    <Box
      maxWidth={1440}
      minWidth={320}
      m="0 auto"
      pb={{
        sm: Setting.DIGIT_40,
        md: Setting.DIGIT_80,
      }}
    >
      <Box width={isMobile ? Setting.WIDTH_SP : Setting.WIDTH_PC} m="0 auto">
        <Box p={isMobile ? '16px 0' : '24px 0'} cursor="pointer">
          <BreadCrumb>
            <Link to={ScreenPath.HOME}>
              <Typography variant="text" color="gray">
                {t('home')}
              </Typography>
            </Link>
            <Link to={ScreenPath.CART}>
              <Typography variant="text" color="black" fontWeight="semibold">
                {t('carts.cart')}
              </Typography>
            </Link>
          </BreadCrumb>
        </Box>
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="semibold">
          {t('carts.your_cart').toUpperCase()}
        </Typography>
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          gap={{
            sm: Setting.DIGIT_16,
            md: Setting.DIGIT_20,
          }}
          mt={{
            sm: Setting.DIGIT_16,
            md: Setting.DIGIT_24,
          }}
        >
          <Box
            border={{
              style: 'solid',
              width: 1,
              color: '#d2caca',
            }}
            borderRadius={Setting.DIGIT_8}
            width={isMobile ? '100%' : '60%'}
            flexGrow={0}
          >
            {isLoading || isFetching ? (
              <Loading loadingType="dots" />
            ) : (
              <Box
                p={{
                  sm: Setting.DIGIT_16,
                  md: Setting.DIGIT_24,
                }}
                gap={{
                  sm: Setting.DIGIT_16,
                  md: Setting.DIGIT_24,
                }}
                display="flex"
                flexDirection="column"
                width="100%"
              >
                {carts.items.map((cart, index) => (
                  <Box key={cart.id}>
                    <CartCard
                      image={cart.image}
                      name={cart.name}
                      color={cart.color}
                      size={cart.size}
                      price={cart.price}
                      quantity={cart.quantity}
                      stock={cart.stock}
                      onRemove={() => onRemoveItem(cart.id)}
                      onChangeQuantity={(quantity) => onUpdateItem(cart.id, quantity)}
                    />
                    {index + 1 !== carts.items.length && (
                      <Box width="100%" height={2} backgroundColor={'#d2caca'}></Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box
            border={{
              style: 'solid',
              width: 1,
              color: '#d2caca',
            }}
            borderRadius={Setting.DIGIT_8}
            width={isMobile ? '100%' : '40%'}
            flexShrink={1}
            height="max-content"
          >
            <Box
              p={{
                sm: Setting.DIGIT_16,
                md: Setting.DIGIT_24,
              }}
              gap={{
                sm: Setting.DIGIT_16,
                md: Setting.DIGIT_24,
              }}
              display="flex"
              flexDirection="column"
            >
              <Typography variant="h6">{t('carts.order_summary')}</Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap={{
                  sm: Setting.DIGIT_14,
                  md: Setting.DIGIT_20,
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="text" fontSize={isMobile ? 'sm' : 'base'} color="gray">
                    {t('carts.subtotal')}
                  </Typography>
                  <Typography variant="text" fontSize={isMobile ? 'sm' : 'base'} fontWeight="semibold">
                    ${carts.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="text" fontSize={isMobile ? 'sm' : 'base'} color="gray">
                    {t('carts.discount')}
                  </Typography>
                  <Typography
                    variant="text"
                    fontSize={isMobile ? 'sm' : 'base'}
                    fontWeight="semibold"
                    color="#FF3333"
                  >
                    -${coupon?.discount || 0}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="text" fontSize={isMobile ? 'sm' : 'base'} color="gray">
                    {t('carts.delivery_fee')}
                  </Typography>
                  <Typography variant="text" fontSize={isMobile ? 'sm' : 'base'} fontWeight="semibold">
                    {t('carts.free_shipping')}
                  </Typography>
                </Box>
                <Box width="100%" height={1} backgroundColor={'gray'}></Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="text" fontSize={isMobile ? 'base' : 'lg'}>
                    {t('carts.total')}
                  </Typography>
                  <Typography variant="text" fontSize={isMobile ? 'base' : 'lg'} fontWeight="semibold">
                    {handleTotalPrice > 0 ? `$${handleTotalPrice.toFixed(2)}` : '$0.00'}
                  </Typography>
                </Box>
              </Box>
              {couponCodeError && (
                <Typography color="#ff7979" fontSize="lg" fontWeight="semibold" textAlign="center">
                  {capitalizeFirstLetter(couponCodeError)}
                </Typography>
              )}
              <Form onSubmit={handleSubmit(handleApplyCoupon)}>
                <Box display="flex" alignItems="center" gap={Setting.DIGIT_12}>
                  <Box width="100%" flexGrow={1}>
                    <Input
                      bgColor="gray"
                      fullWidth
                      variant="pill"
                      prefix={<Gift size={isMobile ? 'small' : 'medium'} />}
                      placeholder={t('carts.discount_code')}
                      errorMessage={errors['code']?.message}
                      {...register('code')}
                    />
                  </Box>
                  <Box flexShrink={0}>
                    <Button size={isMobile ? 'xSmall' : 'small'} roundness="pill" color="dark" type="submit">
                      {t('carts.discount_apply')}
                    </Button>
                  </Box>
                </Box>
              </Form>
              <Button
                size={isMobile ? 'small' : 'medium'}
                roundness="pill"
                color="dark"
                IconRight={<ArrowRight size={isMobile ? 'medium' : 'large'} />}
                fullWidth
              >
                {t('carts.checkout')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
